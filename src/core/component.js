import { isStr, isNum, isArr } from './utils';
import { parseAttrs } from './parse';

export class Component {
  constructor() {
    this._start();
  }

  _start() {
    this.vNodeNext = {};
    this.state = this._setState(this.createState());
    setTimeout(() => this.didMount(), 0);
  }

  _init(state, props) {
    this.props = props;
    this.vNodeCurrent = this.create(state ?? this.state, props ?? this.props);
    return this.vNodeCurrent;
  }

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

    let stackPrev = [this.vNodeCurrent];
    let stackNext = [this.vNodeNext];

    let lastPrev = this.vNodeCurrent;
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

  createState(state) {
    return {};
  }

  create(state, props) {}
  didMount() {}
}
