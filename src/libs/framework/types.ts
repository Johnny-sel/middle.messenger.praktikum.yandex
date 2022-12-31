
export interface IComponentConstructable {
  new(n: IRouterDom): IComponent;
}

export interface IComponent {
  routerDom: IRouterDom; // для управления навигацией из компоненты
  state: Object; // локальное состояние компоненты
  render(): string; // метод который возвращает html разметку
  _reborn(): any; // 
  _registerHandler(uniq: string, method: string): void;
}

export interface IRouterDom {
  routes: any[];
  stack: string[];
  root: Element;
  render(fromStore?: boolean): void;
  navigateTo(path: string, obj?: Object): void;
  _renderPage(Component: IComponentConstructable): void;
  _changeLocation(route: any, clickFromToolbar: boolean): void;
  _checkRoute(route: any): boolean;
  _registerRoute(route: any): void;
  _subscribeLocation(): void;
  _goBack(): void;
  _printError(str: string): void;
}

export type TActionPayload = {
  type: string;
  payload?: any;
}