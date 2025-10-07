// Minimal React-compatible runtime used for offline evaluation environments where the real
// React packages are unavailable. This implementation is intentionally lightweight – it
// provides the subset of behaviour required by the Scrum Book demo application (function
// components, hooks, context, and basic event handling) without depending on external
// packages.

/* eslint-disable @typescript-eslint/no-explicit-any */

export type ReactNode = ReactElement | string | number | boolean | null | undefined | ReactNode[];

export interface ReactElement<P = any> {
  type: any;
  props: P | null;
  key: string | number | null;
}

export type PropsWithChildren<P> = P & { children?: ReactNode };

export type FC<P = {}> = (props: PropsWithChildren<P>) => ReactNode;
export type ComponentType<P = {}> = FC<P>;

export type Dispatch<A> = (value: A) => void;
export type SetStateAction<S> = S | ((prev: S) => S);

export interface MutableRefObject<T> {
  current: T;
}

export type CSSProperties = Record<string, string | number>;
export type HTMLAttributes<T> = Record<string, any>;
export type SVGProps<T> = Record<string, any>;
export type ImgHTMLAttributes<T> = HTMLAttributes<T> & { src?: string; alt?: string };

export type ChangeEvent<T extends EventTarget = Element> = Event & {
  target: T;
  currentTarget: T;
};
export type ChangeEventHandler<T extends EventTarget = Element> = (event: ChangeEvent<T>) => void;
export type FormEvent<T extends EventTarget = Element> = Event & { currentTarget: T };
export type MouseEvent<T extends EventTarget = Element> = globalThis.MouseEvent & { currentTarget: T };
export type KeyboardEvent<T extends EventTarget = Element> = globalThis.KeyboardEvent & { currentTarget: T };

const FragmentSymbol = Symbol('mini-react.fragment');

interface MiniContext<T> {
  id: symbol;
  defaultValue: T;
  Provider: FC<{ value: T; children?: ReactNode }> & {
    __miniReactProvider: true;
    __miniReactContext: MiniContext<T>;
  };
}

type HookEntry =
  | { kind: 'state'; value: unknown }
  | { kind: 'effect'; deps?: unknown[]; cleanup?: (() => void) | void; effect?: () => void | void }
  | { kind: 'memo'; deps?: unknown[]; value: unknown }
  | { kind: 'ref'; ref: MutableRefObject<unknown> };

interface ComponentStore {
  hooks: HookEntry[];
  root: MiniReactRoot | null;
}

interface RenderInstance {
  id: string;
  store: ComponentStore;
  hookIndex: number;
  contextMap: Map<symbol, unknown>;
}

interface MiniReactGlobalState {
  currentInstance: RenderInstance | null;
  currentRoot: MiniReactRoot | null;
  componentStores: Map<string, ComponentStore>;
  pendingEffects: Array<() => void>;
}

const getGlobalState = (): MiniReactGlobalState => {
  const globalObject = globalThis as Record<string, unknown> & {
    __miniReactGlobalState?: MiniReactGlobalState;
  };

  if (!globalObject.__miniReactGlobalState) {
    globalObject.__miniReactGlobalState = {
      currentInstance: null,
      currentRoot: null,
      componentStores: new Map<string, ComponentStore>(),
      pendingEffects: [],
    };
  }

  return globalObject.__miniReactGlobalState;
};

const globalState = getGlobalState();
const componentStores = globalState.componentStores;

const flattenChildren = (value: ReactNode): ReactNode[] => {
  const result: ReactNode[] = [];
  const walk = (child: ReactNode): void => {
    if (Array.isArray(child)) {
      child.forEach(walk);
      return;
    }
    if (child === null || child === undefined || typeof child === 'boolean') {
      return;
    }
    result.push(child);
  };
  walk(value);
  return result;
};

export const Fragment = FragmentSymbol;

export const createElement = (
  type: any,
  rawProps: Record<string, any> | null,
  ...children: ReactNode[]
): ReactElement => {
  const props = { ...(rawProps ?? {}) } as Record<string, any>;
  const key = props?.key ?? null;
  if ('key' in props) {
    delete props.key;
  }

  const childList = children.length === 0 && props.children !== undefined ? [props.children] : children;
  const normalizedChildren = flattenChildren(childList);

  if (normalizedChildren.length === 0) {
    delete props.children;
  } else if (normalizedChildren.length === 1) {
    props.children = normalizedChildren[0];
  } else {
    props.children = normalizedChildren;
  }

  return { type, props, key };
};

const queueMicrotaskShim = (cb: () => void) => {
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(cb);
    return;
  }
  Promise.resolve().then(cb).catch((error) => {
    setTimeout(() => {
      throw error;
    }, 0);
  });
};

class MiniReactRoot {
  private container: Element;
  private currentTree: ReactNode | null = null;
  private scheduled = false;
  private rendering = false;

  constructor(container: Element) {
    this.container = container;
  }

  render(element: ReactNode): void {
    this.currentTree = element;
    this.scheduleRender();
  }

  unmount(): void {
    this.currentTree = null;
    this.container.innerHTML = '';
    this.cleanupUnmounted(new Set());
  }

  scheduleRender(): void {
    if (this.scheduled) {
      return;
    }
    this.scheduled = true;
    queueMicrotaskShim(() => {
      if (!this.scheduled) {
        return;
      }
      this.scheduled = false;
      this.performRender();
    });
  }

  private performRender(): void {
    if (this.rendering) {
      // If we somehow re-enter, queue another pass afterwards.
      this.scheduleRender();
      return;
    }
    this.rendering = true;

    if (this.currentTree == null) {
      this.container.innerHTML = '';
      this.cleanupUnmounted(new Set());
      this.rendering = false;
      return;
    }

    const activeInstanceIds = new Set<string>();
    const previousRoot = globalState.currentRoot;
    globalState.currentRoot = this;

    globalState.pendingEffects = [];
    const nodes = renderNode(this.currentTree, '0', new Map(), activeInstanceIds);

    if ('replaceChildren' in this.container && typeof this.container.replaceChildren === 'function') {
      this.container.replaceChildren(...nodes);
    } else {
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }
      nodes.forEach((child) => this.container.appendChild(child));
    }

    this.cleanupUnmounted(activeInstanceIds);

    const effectsToRun = globalState.pendingEffects;
    globalState.pendingEffects = [];
    effectsToRun.forEach((runEffect) => {
      try {
        runEffect();
      } catch (error) {
        console.error('mini-react effect execution failed', error);
      }
    });

    globalState.currentRoot = previousRoot;
    this.rendering = false;
  }

  private cleanupUnmounted(activeIds: Set<string>): void {
    for (const [id, store] of componentStores.entries()) {
      if (activeIds.has(id)) {
        continue;
      }
      store.hooks.forEach((hook) => {
        if (hook?.kind === 'effect' && typeof hook.cleanup === 'function') {
          try {
            hook.cleanup();
          } catch (error) {
            console.error('mini-react effect cleanup failed', error);
          }
        }
      });
      componentStores.delete(id);
    }
  }
}

const renderNode = (
  node: ReactNode,
  path: string,
  contextMap: Map<symbol, unknown>,
  activeIds: Set<string>
): Node[] => {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return [];
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return [document.createTextNode(String(node))];
  }

  if (Array.isArray(node)) {
    const fragment: Node[] = [];
    node.forEach((child, index) => {
      fragment.push(...renderNode(child, `${path}.${index}`, contextMap, activeIds));
    });
    return fragment;
  }

  const element = node as ReactElement & { props?: Record<string, any> };
  const { type, props } = element;

  if (type === FragmentSymbol) {
    return renderChildren(props?.children, path, contextMap, activeIds);
  }

  if (typeof type === 'function') {
    if ((type as any).__miniReactProvider) {
      const providerContext = (type as any).__miniReactContext as MiniContext<unknown>;
      const nextContext = new Map(contextMap);
      nextContext.set(providerContext.id, props?.value);
      return renderChildren(props?.children, `${path}.p`, nextContext, activeIds);
    }
    return renderFunctionComponent(type, props ?? {}, path, contextMap, activeIds);
  }

  if (typeof type === 'string') {
    const dom = document.createElement(type);
    applyProps(dom, props ?? {});
    const childNodes = renderChildren(props?.children, `${path}.c`, contextMap, activeIds);
    childNodes.forEach((child) => dom.appendChild(child));
    return [dom];
  }

  return [];
};

const renderChildren = (
  children: ReactNode | undefined,
  path: string,
  contextMap: Map<symbol, unknown>,
  activeIds: Set<string>
): Node[] => {
  if (children === undefined) {
    return [];
  }
  const list = Array.isArray(children) ? children : [children];
  const fragment: Node[] = [];
  list.forEach((child, index) => {
    fragment.push(...renderNode(child, `${path}.${index}`, contextMap, activeIds));
  });
  return fragment;
};

const renderFunctionComponent = (
  component: FC<any>,
  props: Record<string, any>,
  path: string,
  contextMap: Map<symbol, unknown>,
  activeIds: Set<string>
): Node[] => {
  const instanceId = path;
  let store = componentStores.get(instanceId);
  if (!store) {
    store = { hooks: [], root: globalState.currentRoot };
    componentStores.set(instanceId, store);
  }
  store.root = globalState.currentRoot;
  activeIds.add(instanceId);

  const previousInstance = globalState.currentInstance;
  globalState.currentInstance = { id: instanceId, store, hookIndex: 0, contextMap };

  let result: ReactNode;
  try {
    result = component(props);
  } catch (error) {
    globalState.currentInstance = previousInstance;
    throw error;
  }

  globalState.currentInstance = previousInstance;
  return renderNode(result, `${path}.0`, contextMap, activeIds);
};

const applyProps = (node: Element, props: Record<string, any>): void => {
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'children' || key === 'ref' || key === undefined) {
      return;
    }
    if (value === null || value === undefined || value === false) {
      return;
    }

    if (key === 'className') {
      (node as HTMLElement).className = String(value);
      return;
    }

    if (key === 'style' && typeof value === 'object') {
      Object.assign((node as HTMLElement).style, value);
      return;
    }

    if (key.startsWith('on') && typeof value === 'function') {
      const event = key.slice(2).toLowerCase();
      node.addEventListener(event, value as EventListener);
      return;
    }

    const attributeName = key === 'htmlFor' ? 'for' : key;
    try {
      if (attributeName in node) {
        (node as any)[attributeName] = value;
      } else {
        node.setAttribute(attributeName, String(value));
      }
    } catch {
      node.setAttribute(attributeName, String(value));
    }
  });
};

const depsAreSame = (a?: unknown[], b?: unknown[]): boolean => {
  if (!a || !b) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (!Object.is(a[i], b[i])) {
      return false;
    }
  }
  return true;
};

const getHook = <T extends HookEntry>(kind: T['kind'], initializer: () => T): T => {
  if (!globalState.currentInstance) {
    throw new Error('Hooks can only be used inside function components.');
  }
  const { store } = globalState.currentInstance;
  const index = globalState.currentInstance.hookIndex++;
  const existing = store.hooks[index];
  if (!existing || existing.kind !== kind) {
    const created = initializer();
    store.hooks[index] = created;
    return created;
  }
  return existing as T;
};

export const useState = <S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
  if (!globalState.currentInstance) {
    console.error('[mini-react] useState without current instance', { initialState });
    throw new Error('useState must be used within a component.');
  }

  const hook = getHook('state', () => ({
    kind: 'state' as const,
    value: typeof initialState === 'function' ? (initialState as () => S)() : initialState,
  }));

  const owningStore = globalState.currentInstance.store;
  const setState: Dispatch<SetStateAction<S>> = (value) => {
    const next = typeof value === 'function' ? (value as (prev: S) => S)(hook.value as S) : value;
    if (!Object.is(next, hook.value)) {
      hook.value = next;
      const root = globalState.currentRoot ?? owningStore.root;
      if (root) {
        root.scheduleRender();
      }
    }
  };

  return [hook.value as S, setState];
};

export const useRef = <T>(initialValue: T): MutableRefObject<T> => {
  const hook = getHook('ref', () => ({
    kind: 'ref' as const,
    ref: { current: initialValue },
  }));
  return hook.ref as MutableRefObject<T>;
};

export const useEffect = (effect: () => void | (() => void), deps?: unknown[]): void => {
  const hook = getHook('effect', () => ({
    kind: 'effect' as const,
    deps: undefined as unknown[] | undefined,
    cleanup: undefined as (() => void) | void,
  }));
  const shouldRun = !deps || !hook.deps || !depsAreSame(deps, hook.deps);
  if (!shouldRun) {
    return;
  }
  hook.deps = deps ? [...deps] : undefined;
  const instanceId = globalState.currentInstance?.id;
  globalState.pendingEffects.push(() => {
    if (instanceId && !componentStores.has(instanceId)) {
      return;
    }
    if (hook.cleanup) {
      try {
        (hook.cleanup as () => void)();
      } catch (error) {
        console.error('mini-react effect cleanup failed', error);
      }
      hook.cleanup = undefined;
    }
    const cleanup = effect();
    if (typeof cleanup === 'function') {
      hook.cleanup = cleanup;
    } else {
      hook.cleanup = undefined;
    }
  });
};

export const useMemo = <T>(factory: () => T, deps?: unknown[]): T => {
  const hook = getHook('memo', () => ({
    kind: 'memo' as const,
    value: factory(),
    deps: deps ? [...deps] : undefined,
  }));

  if (!deps || !hook.deps || !depsAreSame(deps, hook.deps)) {
    hook.value = factory();
    hook.deps = deps ? [...deps] : undefined;
  }

  return hook.value as T;
};

export const useCallback = <T extends (...args: any[]) => any>(fn: T, deps?: unknown[]): T => {
  return useMemo(() => fn, deps);
};

export const useContext = <T>(context: MiniContext<T>): T => {
  if (!globalState.currentInstance) {
    throw new Error('useContext must be used within a component.');
  }
  if (globalState.currentInstance.contextMap.has(context.id)) {
    return globalState.currentInstance.contextMap.get(context.id) as T;
  }
  return context.defaultValue;
};

export const useReducer = <S, A>(reducer: (state: S, action: A) => S, initialState: S): [S, Dispatch<A>] => {
  const [state, setState] = useState(initialState);
  const dispatch: Dispatch<A> = (action) => {
    setState((prev) => reducer(prev, action));
  };
  return [state, dispatch];
};

export const createContext = <T>(defaultValue: T): MiniContext<T> => {
  const context: MiniContext<T> = {
    id: Symbol('mini-react.context'),
    defaultValue,
    Provider: undefined as unknown as MiniContext<T>['Provider'],
  };

  const Provider: MiniContext<T>['Provider'] = (({ value, children }) =>
    createElement(FragmentSymbol, null, children)) as MiniContext<T>['Provider'];

  Provider.__miniReactProvider = true;
  Provider.__miniReactContext = context;

  context.Provider = Provider;
  return context;
};

export const isValidElement = (value: unknown): value is ReactElement => {
  return typeof value === 'object' && value !== null && 'type' in (value as Record<string, unknown>);
};

const StrictMode: FC<{ children?: ReactNode }> = ({ children }) => (children ?? null);

const ReactCore = {
  createElement,
  Fragment: FragmentSymbol,
  StrictMode,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
  useReducer,
  createContext,
  isValidElement,
};

const React = ReactCore;

export default React;
export { StrictMode };

declare global {
  namespace JSX {
    type Element = ReactNode;
    interface IntrinsicElements {
      [elementName: string]: Record<string, any>;
    }
    interface IntrinsicAttributes {
      key?: string | number | null;
    }
  }
}

export const __createMiniReactRoot = (container: Element): MiniReactRoot => new MiniReactRoot(container);
