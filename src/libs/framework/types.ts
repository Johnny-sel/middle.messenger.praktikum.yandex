
export interface IComponentConstructable {
  new(n: IRouterDOM): IComponent;
}

export interface IComponent {
  routerContext: IRouterDOM;
  state: Object;
  reborn(): any;
  render(): string;
  _registerHandler(uniq: string, method: string): void;
}

export interface IRouterDOM {
  routes: any[];
  stack: string[];
  root: HTMLElement;
  render(): void;
  navigateTo(path: string, obj?: Object): void;
  _renderPage(Component: IComponentConstructable): void;
  _changeLocation(route: any, clickFromToolbar: boolean): void;
  _checkRoute(route: any): boolean;
  _registerRoute(route: any): void;
  _subscribeLocation(): void;
  _goBack(): void;
  _printError(str: string): void;
}