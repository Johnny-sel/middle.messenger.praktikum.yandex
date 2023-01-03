import { isStr, isNum, isArr } from './utils';
import { parseAttrs } from './parse';

export class Component {
  constructor() {
    this.state = this._setState(this.createState());
    this.vNodeNext = {};

    this._init = (state) => {
      this.vNodePrev = this.create(state ?? this.state);
      return this.vNodePrev;
    };

    setTimeout(() => this.didMount(), 500);
  }

  create(state) {}
  createState() {}
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
          lastPrev.element.innerHTML = vNext;
          lastPrev.children = [vNext];
        }

        isChaned = this._compareAttrs(vPrev, vNext);

        if (isChaned) {
          const attributes = Object.entries(parseAttrs(vNext.attrs));
          attributes.forEach(([key, value]) => {
            vPrev.element.setAttribute(key, value);
            vPrev.attrs = vNext.attrs;
          });
        }
      }
    }
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
    const nextAttr = Object.entries(parseAttrs(next.attrs)).join();
    const prevAttr = Object.entries(parseAttrs(prev.attrs)).join();
    return prevAttr !== nextAttr;
  }
}
