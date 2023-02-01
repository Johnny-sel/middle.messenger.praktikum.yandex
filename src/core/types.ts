import {Component} from '@core/component';

export type VirtualNode = {
  attrs: Record<string, string>;
  children: VirtualNode[] | string[];
  handlers: object;
  tag: string;
  HTMLElement?: HTMLElement | Text;
};

export type vNode = VirtualNode | string | number;
export type FunctionVirtualNode = (...args: any[]) => VirtualNode;
export type Attrs = Record<string, string>;
export type Props = Record<string, string>;
export type Route = {path: string; component: IComponentConstructable};
export type NavOptions = {clickButton?: 'prev' | 'next'};
export type ClickButton = NavOptions['clickButton'];
export type State = Record<string, string>;
export type RegisteredComponent = {key: string; component: Component};

export interface IComponentConstructable {
  new (): Component;
}
