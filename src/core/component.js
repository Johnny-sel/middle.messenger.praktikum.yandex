import { isStr, isNum, isArr, random } from './utils';
import { parseAttrs, parseHandlers } from './parse';

export default class Component {
  constructor() {
    this.vNodeNext = {};
    this.state = this._setState(this.createState());
    this.prototype = Object.getPrototypeOf(this);

    this._init = (state) => {
      this.vNodePrev = this.create(state ?? this.state);
      this.vNodePrev = this._registHandlers(this.vNodePrev);
      return this.vNodePrev;
    };

    setTimeout(() => this.didMount(), 500);
  }

  createState(state) {
    return {};
  }

  create(state) {}
  didMount() {}

  _init(state) {}

  _setState(initialState) {
    return new Proxy(initialState, {
      set: this._interception.bind(this),
    });
  }

  _interception(prevState, prop, newValue) {
    prevState[prop] = newValue;

    this.vNodeNext = this.create(prevState);
    this._injecting();
    return prevState;
  }

  _injecting() {
    let isChaned = false;

    let stackPrev = [this.vNodePrev];
    let stackNext = [this.vNodeNext];

    let lastPrev = this.vNodePrev;
    let lastNext = this.vNodeNext;

    while (stackPrev.length > 0 || stackNext.length > 0) {
      const vPrev = stackPrev.pop();
      const vNext = stackNext.pop();

      if (vPrev !== undefined && vNext !== undefined) {
        if (isArr(vPrev.children)) {
          lastPrev = vPrev;
          stackPrev.push(...vPrev.children);
        }

        if (isArr(vNext.children)) {
          lastNext = vNext;
          stackNext.push(...vNext.children);
        }

        isChaned = this._compareChilds(vPrev, vNext);

        if (isChaned) {
          this._injectChilds(lastPrev, vNext);
        }

        isChaned = this._compareAttrs(vPrev, vNext);

        if (isChaned) {
          this._injectAttr(vPrev, vNext);
        }
      }
    }
  }

  _registHandlers(vNode) {
    let isHasHandler = false;
    let names = [];
    let stack = [vNode];

    while (stack.length > 0) {
      const vNode = stack.pop();

      if (isArr(vNode.children)) {
        stack.push(...vNode.children);
      }

      isHasHandler = vNode.attrs?.includes('()');

      if (isHasHandler) {
        names = parseHandlers(vNode.attrs);
        names.forEach((handlerName) => {
          const uniq = handlerName + random();
          vNode.attrs = vNode.attrs.replace(handlerName, uniq);
          if (this.__proto__[handlerName]) {
            window[uniq] = this.__proto__[handlerName].bind(this);
          }
        });
      }
    }

    return vNode;
  }

  _injectChilds(lastPrev, next) {
    lastPrev.element.innerHTML = next;
    lastPrev.children = [next];
  }

  _injectAttr(prev, next) {
    const attributes = Object.entries(parseAttrs(next.attrs));
    attributes.forEach(([key, value]) => {
      prev.element.setAttribute(key, value);
      prev.attrs = next.attrs;
    });
  }

  _compareChilds(prev, next) {
    if (!(isStr(prev) || isNum(prev))) {
      return false;
    }
    return prev !== next;
  }

  _compareAttrs(prev, next) {
    if (isStr(prev) || isNum(prev)) {
      return false;
    }
    const nextAttrs = Object.entries(parseAttrs(next.attrs)).join();
    const prevAttrs = Object.entries(parseAttrs(prev.attrs)).join();
    return prevAttrs !== nextAttrs;
  }
}
