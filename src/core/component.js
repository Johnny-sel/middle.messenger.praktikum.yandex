import { isStr, isNum, isArr } from './utils';
import { parseAttrs } from './parse';

export class Component {
  constructor() {
    this.state = this.setInitialState(this.initState());
    this.create = (state) => {
      this.vNodePrev = this.render(state ?? this.state);
      this.vNodeNext = {};
      return this.vNodePrev;
    };
    setTimeout(() => this.didMount(),500);
  }

  // this is indetical
  create(state) {} // for developer
  render(state) {} // for user

  initState() {}
  didMount() {}

  setInitialState(initialState) {
    return new Proxy(initialState, {
      set: this._hookStateSetter.bind(this),
    });
  }

  _hookStateSetter(prevState, prop, newValue) {
    prevState[prop] = newValue;

    this.vNodeNext = this.render(prevState);
    this._injectingNodes();
    return prevState;
  }

  _injectingNodes(vNodeNext) {
    if (isStr(vNodeNext) || isNum(vNodeNext)) {
      return;
    }

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

        const childrenChanged = this._compareChildren(vPrev, vNext);

        if (childrenChanged) {
          lastPrev.element.innerHTML = vNext;
          lastPrev.children = [vNext];
        }

        const attrsChanged = this._compareAttributes(vPrev, vNext);

        if (attrsChanged) {
          const attributes = Object.entries(parseAttrs(vNext.attrs));
          attributes.forEach(([key, value]) => {
            vPrev.element.setAttribute(key, value);
            vPrev.attrs = vNext.attrs;
          });
        }
      }
    }
  }

  _compareChildren(prev, next) {
    if (!(isStr(prev) || isNum(prev))) {
      return false;
    }
    return prev !== next;
  }

  _compareAttributes(prev, next) {
    if (isStr(prev) || isNum(prev)) {
      return false;
    }
    const nextAttr = Object.entries(parseAttrs(next.attrs)).join();
    const prevAttr = Object.entries(parseAttrs(prev.attrs)).join();
    return prevAttr !== nextAttr;
  }
}
