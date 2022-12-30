import { last, penultimate } from "../utils";

export class RouterDOM {
  constructor(root, routes) {
    this.routes = routes;
    this.root = root;
    this.stack = [];
  }

  render() {
    this._subscribeLocation();
    this.navigateTo(window.location.pathname);
  }

  navigateTo(path, { clickFromToolbar } = {}) {
    path = path.startsWith("/") ? path : "/" + path;
    const route = this.routes.find(route => route.path === path);
    const isChecked = this._checkRoute(route);

    if (!isChecked) return;

    this._renderPage(route.component);
    this._changeLocation(route, clickFromToolbar);
    this._registerRoute(route);

    console.info("[RouterDOM]: stack ", this.stack);
  }

  _renderPage(Component) {
    const component = new Component(this); // когда создаем компонету, передаем туда RouterDOM
    const element = document.createElement("div");

    const node = component._reborn(); // сюда приходит отформатированая компонента
    const rootChild = this.root.firstChild;

    element.innerHTML = node.render();

    if (rootChild) {
      this.root.removeChild(rootChild);
    }

    this.root.appendChild(element.firstChild);
  }

  _checkRoute(route) {
    const isRouteExist = this.routes.includes(route);
    const path = route.path.startsWith("/") ? route?.path : "/" + route?.path;

    if (!isRouteExist) {
      this._printError("define route in index.js");
      return false;
    }

    if (route.component === undefined) {
      this._printError("component in route shoudle be define");
      return false;
    }

    if (typeof path !== "string") {
      this._printError("route shoulde be string");
      return false;
    }

    if (path == last(this.stack)) {
      this._printError("you are already on this route");
      return false;
    }

    return true;
  }

  _changeLocation(route, clickFromToolbar) {
    if (clickFromToolbar) {
      history.replaceState({}, route.path, route.path);
    } else {
      history.pushState({}, route.path, route.path);
    }
  }

  _registerRoute(route) {
    const path = route.path.startsWith("/") ? route.path : "/" + route.path;
    if (last(this.stack) === path) return;
    this.stack.push(path);
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

  _printError(string) {
    console.error(`[RouterDOM]: ${string}`);
  }
}
