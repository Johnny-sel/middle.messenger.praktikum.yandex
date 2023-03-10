import {createHTMLElement} from '../vdom/dom/dom';
import {penultimate} from '../utils';
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
    this.instance.subscribe();
    this.instance.navigateTo(window.location.pathname);
    this.instance.isInit = false;
  }

  public static to(path: string): void {
    this.instance.navigateTo(path);
  }

  static goBack(): void {
    this.instance.goBack();
  }

  private listener() {
    const path = window.location.pathname;

    if (path === this.stack[this.index - 1]) {
      this.navigateTo(path, {clickButton: 'prev'});
    } else {
      this.navigateTo(path, {clickButton: 'next'});
    }
  }

  // ! https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
  // ! не понял про какой click Вы имели ввиду, тут подписка на событие 'popstate',
  // ! которая срабатывает один раз при Router.render
  private subscribe(): void {
    window.addEventListener('popstate', this.listener.bind(this));
  }

  private navigateTo(path: string, {clickButton}: NavOptions = {}): void {
    let route = this.routes.find((route) => route.path === path);
    const isChecked = this.checkRoute(route);

    if (!isChecked) {
      route = this.routes.find((route) => route.path === '/error')!;
    }

    if (route === undefined) {
      throw new Error(`[Router]: router '/error' is undefined`);
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
    const vDom = component.init();
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
      return false;
    }

    if (!route.path.startsWith('/')) {
      return false;
    }

    return true;
  }
}
