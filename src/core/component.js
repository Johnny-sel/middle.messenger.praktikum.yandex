import { createElement } from './element';
import { random, isStr, isFunc, isNum, isArr } from './utils';

export class Component {
  constructor(props) {
    this.state = {};
    this.key = random();

    this.init();
    this._overriderComponent();
    this._registerComponent();
  }

  render() {}
  init() {}

  setInitState(initialState) {
    return new Proxy(initialState, {
      set: (prevState, property, newValue) => {
        const component = this.render();
        const components = this._replaceStateValues(component, property, newValue);
        components.forEach((comp) => {
          const pasted = createElement(comp);
          const attr = `[data-state='${property}']`;
          const deleted = document.querySelector(attr);
          deleted.replaceWith(pasted);
        });

        prevState[property] = newValue;
        return prevState;
      },
    });
  }

  _overriderComponent() {
    const component = this.render();
    component.attrs = `data-key=${this.key}; ` + component.attrs;
    this.render = () => component;
  }

  _registerComponent() {
    window['components'] = { [this.key]: this };
  }

  _replaceStateValues(component, property, newValue) {
    if (isStr(component) || isNum(component)) {
      return this.render();
    }

    let stack = [component];
    let list = [];

    while (stack.length > 0) {
      const comp = stack.pop();
      if (comp && isArr(comp.children)) {
        stack.push(...comp.children);
        const prop = comp.attrs.match(property);
        if (prop) {
          comp.children = [newValue];
          list.push(comp);
        }
      }
    }

    this.render = () => component;

    return list;
  }
}
