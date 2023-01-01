import { Component } from '@framework';


export interface IComponentConstructable {
  new(routerDom?: IRouterDom, props?: any): IComponent;
}
export interface IComponent {
  routerDom: IRouterDom; // для управления навигацией из компоненты
  state: Object; // локальное состояние компоненты
  props?: any; // параметры передаваемые в компоненту
  render(): string; // метод который возвращает разметку компоненты
  setState?(state: Object): void; // метод который возвращает разметку компоненты
  componentDidMount?(): void; // метод который возвращает разметку компоненты
  init(): string; // метод который запускает процесс инициализации компоненты
  _formatHtml(): string; // метод который превращает разметку компоненты в валидный html
  _replaceMethodsInHTML(method: string[], html: string): void; // делает имена обработчиков у компоненты уникальными
  _registeringHandler(uniq: string, method: string): void; // добавляет обработчики компоненты в глобальный объект
  _registerComponent(): void; // добавляет обработчики компоненты в глобальный объект
}

export interface IRouterDom {
  routes: any[];
  stack: string[];
  components: any[];
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