import {createHTMLElement} from '../vdom/dom/dom';
import {isStr, penultimate} from '../utils';
import {ClickButton, NavOptions, RegisteredComponent, Route} from './../types';

export class Router {
  private static instance: Router;

  private registeredComponents: RegisteredComponent[];
  private routes: Route[];
  private stack: string[];

  private index: number;
  private isInit: boolean;
  private root: HTMLElement;

  constructor(routes: Route[]) {
    this.routes = routes;
    this.registeredComponents = [];
    this.stack = [];
    this.index = 0;
    this.isInit = true;
  }

  public static init(routes: Route[]): Router {
    if (!this.instance) {
      this.instance = new Router(routes);
    }

    return this.instance;
  }

  public static render(root: HTMLElement): void {
    this.instance.root = root;
    this.instance.subscribe('popstate', this.instance);
    this.instance.navigateTo(window.location.pathname);
    this.instance.isInit = false;
  }

  public static to(path: string): void {
    this.instance.navigateTo(path);
  }

  static goBack(): void {
    this.instance.goBack();
  }

  private subscribe(event: string, context: Router): void {
    return window.addEventListener(event, function () {
      if (event === 'popstate') {
        const path = window.location.pathname;

        if (path === context.stack[context.index - 1]) {
          context.navigateTo(path, {clickButton: 'prev'});
        } else {
          context.navigateTo(path, {clickButton: 'next'});
        }
      }
    });
  }

  private navigateTo(path: string, {clickButton}: NavOptions = {}): void {
    let route = this.routes.find((route) => route.path === path);
    const isChecked = this.checkRoute(route);

    if (!isChecked) {
      route = this.routes.find((route) => route.path === '/error');
    }

    if (route === undefined) {
      throw new Error('[Roter]: router is undefined');
    }

    this.renderPage(route);
    this.changeUrl(route, clickButton);
    this.registRoute(route, clickButton);
  }

  private goBack(): void {
    const path = penultimate(this.stack) as string;
    if (path) {
      this.navigateTo(path);
    }
  }

  private renderPage(route: Route): void {
    this.root.innerHTML = '';

    const finded = this.registeredComponents.find((e) => e.key === route.path);
    const component = finded ? finded.component : new route.component();
    const vDom = component._init();
    const rootNode = createHTMLElement(vDom);

    if (!finded) {
      this.registeredComponents.push({key: route.path, component});
    }

    this.root.appendChild(rootNode);
  }

  private changeUrl(route: Route, clickButton: ClickButton): void {
    if (clickButton) {
      history.replaceState({}, route.path, route.path);
    } else {
      history.pushState({}, route.path, route.path);
    }
  }

  private registRoute(route: Route, clickButton: ClickButton): void {
    if (clickButton === 'prev') {
      this.index--;
    } else if (clickButton === 'next') {
      this.index++;
    } else {
      this.stack.push(route.path);
      this.index = this.isInit ? 0 : this.index + 1;
    }
  }

  private checkRoute(route?: Route): boolean {
    if (!route) {
      this.printError('define route in index.js');
      return false;
    }

    if (!route.path.startsWith('/')) {
      this.printError("route shoulde be start with '/'");
      return false;
    }

    if (route.component === undefined) {
      this.printError('component in route shoudle be define');
      return false;
    }

    if (!isStr(route.path)) {
      this.printError('route shoulde be string');
      return false;
    }

    return true;
  }

  private printError(string: string): void {
    console.error(`[Router]: ${string}`);
  }

  // private printInfo(string: string): void {
  //   console.info(`[Router]: ${string}`);
  // }
}
