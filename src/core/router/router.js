import { createRootNode } from './dom';
import { isStr, penultimate } from '../utils';

export class Router {
  constructor(routes) {
    this.routes = routes;
    this.stack = [];
    this.index = 0;
    this.isInit = true;
  }

  static init(routes) {
    if (!this.instance) {
      this.instance = new Router(routes);
    }

    return this.instance;
  }

  static render(root) {
    this.instance.initPath = window.location.pathname;
    this.instance.root = root;
    this.instance._subscribe('popstate', this.instance);
    this.instance._navigateTo(this.instance.initPath);
    this.instance.isInit = false;
  }

  static to(path, { toolbar } = {}) {
    this.instance._navigateTo(path, { toolbar });
  }

  static goBack() {
    const path = penultimate(this.instance.stack);
    this.instance._navigateTo(path);
  }

  _subscribe(event, context) {
    return window.addEventListener(event, function (e) {
      if (event === 'popstate') {
        const path = window.location.pathname;

        if (path === context.stack[context.index - 1]) {
          context._navigateTo(path, { clickButton: 'prev' });
        } else {
          context._navigateTo(path, { clickButton: 'next' });
        }

        context.prevPath = path;
      }
    });
  }

  _navigateTo(path, { clickButton } = {}) {
    let route = this.routes.find((route) => route.path === path);
    const isChecked = this._checkRoute(route);

    if (!isChecked) {
      route = route = this.routes.find((route) => route.path === '/error-404');
    }

    this._renderPage(route.component);
    this._changeUrl(route, clickButton);
    this._registRoute(route, clickButton);

    console.info('[Router]: stack ', this.stack);
  }

  _goBack() {
    const path = penultimate(this.stack);
    this._navigateTo(path);
  }

  _renderPage(ComponentInstance) {
    this.root.innerHTML = '';
    const componentInstance = new ComponentInstance();
    const vDom = componentInstance._init();
    const rootNode = createRootNode(vDom);
    root.appendChild(rootNode);
  }

  _changeUrl(route, clickButton) {
    if (clickButton) {
      history.replaceState({}, route.path, route.path);
    } else {
      history.pushState({}, route.path, route.path);
    }
  }

  _registRoute(route, clickButton) {
    if (clickButton === 'prev') {
      this.index--;
    } else if (clickButton === 'next') {
      this.index++;
    } else {
      this.stack.push(route.path);
      this.index = this.isInit ? 0 : this.index + 1;
    }
  }

  _checkRoute(route) {
    const isRouteExist = this.routes.includes(route);

    if (!isRouteExist) {
      this._printError('define route in index.js');
      return false;
    }

    if (!route.path.startsWith('/')) {
      this._printError("route shoulde be start with '/'");
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

  _printError(string) {
    console.error(`[Router]: ${string}`);
  }

  _printInfo(string) {
    console.info(`[Router]: ${string}`);
  }
}
