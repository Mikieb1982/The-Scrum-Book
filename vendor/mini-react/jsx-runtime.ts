import { createElement, Fragment, ReactElement } from './index';

export { Fragment };

export const jsx = (
  type: ReactElement['type'],
  props: ReactElement['props'] | null,
  key?: ReactElement['key']
): ReactElement => createElement(type, { ...(props ?? {}), key });

export const jsxs = jsx;
export const jsxDEV = jsx;
