import { __createMiniReactRoot, ReactNode } from '../mini-react/index';

export interface Root {
  render(element: ReactNode): void;
  unmount(): void;
}

const resolveMountPoint = (container: Element | Document): Element => {
  if (container instanceof Element) {
    return container;
  }
  const rootElement = container.getElementById('root') ?? container.body ?? container.documentElement;
  if (!rootElement) {
    throw new Error('Unable to resolve a mount point within the provided document.');
  }
  return rootElement as Element;
};

export const createRoot = (container: Element | Document): Root => {
  const mountPoint = resolveMountPoint(container);
  const root = __createMiniReactRoot(mountPoint);
  return {
    render(element: ReactNode) {
      root.render(element);
    },
    unmount() {
      root.unmount();
    },
  };
};

const ReactDOM = { createRoot };

export default ReactDOM;
