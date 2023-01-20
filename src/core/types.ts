// VDOM --------------------
export type VirtualNode = {
  attrs: object;
  children: VirtualNode[] | string[];
  handlers: object;
  tag: string;
  HTMLElement?: HTMLElement | Text;
};

export type FunctionVirtualNode = (...args: any[]) => VirtualNode;
export type Attrs = {[key: string]: unknown};
export type Route = {path: string; component: any};
export type NavOptions = {clickButton?: 'prev' | 'next'};
export type Props = {[key: string]: unknown};
export type State = {[key: string]: any};

// ROUTER ------------------
export interface IRouter {
  root: HTMLElement;
  routes: Route[];
  stack: string[];
  index: number;
  isInit: boolean;

  _subscribe(event: string, instance: IRouter): unknown;
  _navigateTo(path: string, options?: NavOptions): unknown;
  _goBack(): void;
  _renderPage(ComponentInstance: any): void;
  _changeUrl(route: Route, clickButton: NavOptions['clickButton']): void;
  _registRoute(route: Route, clickButton: NavOptions['clickButton']): void;
  _checkRoute(route: Route | undefined): boolean;
  _printError(string: string): void;
  _printInfo(string: string): void;
}

// COMPONENT -----------------

export interface IComponentConstructable<State> {
  new (): IComponent<State>;
}

export interface IComponent<State> {
  vNodeNext: VirtualNode;
  vNodeCurrent: VirtualNode;
  state: State;
  props?: Props;

  createState(): State;
  create(state: State, props?: Props): VirtualNode;
  didMount(state: State, props: Props): void;

  _init(props?: Props): VirtualNode;
  _setState(state: State): State;
  _interception(state: State, prop: string, newValue: any): boolean;
  _injectHTML(): void;
  _injectTextNode(vNodePrevLast: VirtualNode, textNode: VirtualNode): void;
  _injectChilds(vNode: VirtualNode): void;
  _injectAttr(vNodePrev: VirtualNode, vNodeNext: VirtualNode): void;
  _compareInnerText(vNodePrev: VirtualNode, vNodeNext: VirtualNode): void;
  _compareAttrs(vNodePrev: VirtualNode, vNodeNext: VirtualNode): void;
}
