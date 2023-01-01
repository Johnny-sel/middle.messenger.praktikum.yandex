import { last, penultimate } from "@utils";
import { IComponentConstructable, IRouterDom } from "@framework/types";

export class RouterDom implements IRouterDom {
  routes: any[];
  stack: any[];
  root: Element;
  components: [];

  constructor(root: Element, routes: any[]) {
    this.routes = routes;
    this.root = root;
    this.stack = [];
    this.components = [];
    window['RouterDom'] = this;
  }

  render() {
    this._subscribeLocation();
    this.navigateTo(window.location.pathname);
  }

  navigateTo(path: string, { clickFromToolbar }: any | undefined = {}) {
    const route = this.routes.find(route => route.path === path);
    const isChecked = this._checkRoute(route);

    if (!isChecked) return;

    this._renderPage(route.component);
    this._changeLocation(route, clickFromToolbar);
    this._registerRoute(route);

    console.info("[RouterDom]: stack ", this.stack);
  }

  _renderPage(Component: IComponentConstructable) {
    const component = new Component(this); // когда создаем компонету, передаем туда RouterDom
    const element = document.createElement("div");
    const rootChild = this.root.firstChild;

    element.innerHTML = `<div>${component.init()}</div>`; // вернет валидную разметкуы html

    if (rootChild) {
      this.root.removeChild(rootChild);
    }

    this.root.appendChild(element.firstChild);
  }

  _checkRoute(route) {
    const isRouteExist = this.routes.includes(route);

    if (!isRouteExist) {
      this._printError("define route in index.js");
      return false;
    }

    if (!route.path.startsWith("/")) {
      this._printError("route shoulde be start with '/'");
      return false;
    }

    if (route.component === undefined) {
      this._printError("component in route shoudle be define");
      return false;
    }

    if (typeof route.path !== "string") {
      this._printError("route shoulde be string");
      return false;
    }

    if (route.path == last(this.stack)) {
      this._printError("you are already on this route");
      return false;
    }

    return true;
  }

  _changeLocation(route: any, clickFromToolbar: boolean) {
    if (clickFromToolbar) {
      history.replaceState({}, route.path, route.path);
    } else {
      history.pushState({}, route.path, route.path);
    }
  }

  _registerRoute(route) {
    if (last(this.stack) === route.path) return;
    this.stack.push(route.path);
  }

  _subscribeLocation() {
    return window.addEventListener("popstate", () => {
      const path = penultimate(this.stack); // предпоследний
      this.navigateTo(path, { clickFromToolbar: true }); // клик из браузерной панели (назад, вперед)
    });
  }

  _goBack() {
    const path = penultimate(this.stack); // предпоследний
    this.navigateTo(path);
  }

  _printError(string: string) {
    console.error(`[RouterDom]: ${string}`);
  }
}
