// VDOM --------------------
export type VirtualNode = {
  attrs: Record<string, string>;
  children: VirtualNode[] | string[];
  handlers: object;
  tag: string;
  HTMLElement?: HTMLElement | Text;
};

export type FunctionVirtualNode = (...args: any[]) => VirtualNode;
export type Attrs = Record<string, string>;
export type Props = Record<string, string>;
export type Route = {path: string; component: Component};
export type NavOptions = {clickButton?: 'prev' | 'next'};
export type ClickButton = NavOptions['clickButton'];
export type State = Record<string, string>;
export type RegisteredComponent = {key: string; component: IComponent<unknown>};
export type Component = IComponentConstructable<unknown>;
export type vNode = VirtualNode | string | number;

export interface IComponentConstructable<Props> {
  new (): IComponent<Props>;
  init(props?: Props): VirtualNode;
}

export interface IComponent<Props> {
  key: string;
  stack: RegisteredComponent[];

  init(props?: Props): VirtualNode;
  reCreate(props?: Props): VirtualNode;
}
