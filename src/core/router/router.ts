import {createHTMLElement} from '../vdom/dom';
import {isStr, penultimate} from '../utils';
import {IComponentConstructable, IRouter, NavOptions, Route} from './../types';

export class Router implements IRouter {
  static instance: IRouter;

  routes: Route[];
  stack: string[];
  index: number;
  isInit: boolean;
  root: HTMLElement;

  constructor(routes: Route[]) {
    this.routes = routes;
    this.stack = [];
    this.index = 0;
    this.isInit = true;
  }

  static init(routes: Route[]): IRouter {
    if (!this.instance) {
      this.instance = new Router(routes);
    }

    return this.instance;
  }

  static render(root: HTMLElement): void {
    this.instance.root = root;
    this.instance._subscribe('popstate', this.instance);
    this.instance._navigateTo(window.location.pathname);
    this.instance.isInit = false;
  }

  static to(path: string): void {
    this.instance._navigateTo(path);
  }

  static goBack(): void {
    this.instance._goBack();
  }

  _subscribe(event: string, context: IRouter): void {
    return window.addEventListener(event, function() {
      if (event === 'popstate') {
        const path = window.location.pathname;

        if (path === context.stack[context.index - 1]) {
          context._navigateTo(path, {clickButton: 'prev'});
        } else {
          context._navigateTo(path, {clickButton: 'next'});
        }
      }
    });
  }

  _navigateTo(path: string, {clickButton}: NavOptions = {}): void {
    let route = this.routes.find((route) => route.path === path);
    const isChecked = this._checkRoute(route);

    if (!isChecked) {
      route = this.routes.find((route) => route.path === '/error');
    }

    if (route === undefined) {
      throw new Error('[Roter]: router is undefined');
    }

    this._renderPage(route.component);
    this._changeUrl(route, clickButton);
    this._registRoute(route, clickButton);
  }

  _goBack(): void {
    const path = penultimate(this.stack);
    if (path) {
      this._navigateTo(path);
    }
  }

  _renderPage(ComponentInstance: IComponentConstructable): void {
    this.root.innerHTML = '';
    const componentInstance = new ComponentInstance();
    const vDom = componentInstance._init();
    const rootNode = createHTMLElement(vDom);
    this.root.appendChild(rootNode);
  }

  _changeUrl(route: Route, clickButton: NavOptions['clickButton']): void {
    if (clickButton) {
      history.replaceState({}, route.path, route.path);
    } else {
      history.pushState({}, route.path, route.path);
    }
  }

  _registRoute(route: Route, clickButton: NavOptions['clickButton']): void {
    if (clickButton === 'prev') {
      this.index--;
    } else if (clickButton === 'next') {
      this.index++;
    } else {
      this.stack.push(route.path);
      this.index = this.isInit ? 0 : this.index + 1;
    }
  }

  _checkRoute(route: Route | undefined): boolean {
    if (!route) {
      this._printError('define route in index.js');
      return false;
    }

    if (!route.path.startsWith('/')) {
      this._printError('route shoulde be start with \'/\'');
      return false;
    }

    if (route.component === undefined) {
      this._printError('component in route shoudle be define');
      return false;
    }

    if (!isStr(route.path)) {
      this._printError('route shoulde be string');
      return false;
    }

    return true;
  }

  _printError(string: string): void {
    console.error(`[Router]: ${string}`);
  }

  _printInfo(string: string): void {
    console.info(`[Router]: ${string}`);
  }
}
