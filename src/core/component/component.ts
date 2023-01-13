import { isStr, isNum, isArr, isDiffLength } from '../utils';
import { createHTMLElement } from '../vdom/dom';
import { Props, IComponent, VirtualNode, State } from '../types';

export abstract class Component implements IComponent {
  vNodeNext: VirtualNode;
  vNodeCurrent: VirtualNode;
  state: State;
  props: Props;

  constructor() {
    this.state = this._setState(this.createState());
    setTimeout(() => this.didMount(), 0);
  }

  _init(props: Props) {
    this.props = props;
    this.vNodeCurrent = this.create(this.state, this.props);
    return this.vNodeCurrent;
  }

  _setState(initialState: State) {
    const self = this;
    return new Proxy(initialState, {
      set: self._interception.bind(self),
    });
  }

  _interception(state: State, prop: string, newValue: any) {
    state[prop] = newValue;
    this.vNodeNext = this.create(state);
    this._injectHTML();
    return true;
  }

  _injectHTML() {
    let isDiff = false;

    let stackPrev = [this.vNodeCurrent];
    let stackNext = [this.vNodeNext];

    let vNodePrevLast = this.vNodeCurrent;
    let vNodeNextLast = this.vNodeNext;

    while (stackPrev.length > 0 || stackNext.length > 0) {
      let vNodePrev: VirtualNode | string = stackPrev.pop()!;
      let vNodeNext: VirtualNode | string = stackNext.pop()!;

      if (isDiffLength(stackPrev, stackNext)) {
        vNodePrevLast.children = vNodeNextLast.children;
        this._injectChilds(vNodePrevLast);
        break;
      }

      if (isArr<unknown>(vNodePrev.children)) {
        vNodePrevLast = vNodePrev;
        stackPrev.push(...vNodePrev.children as []);
      }

      if (isArr<unknown>(vNodeNext.children)) {
        vNodeNextLast = vNodeNext;
        stackNext.push(...vNodeNext.children as []);
      }

      isDiff = this._compareInnerText(vNodePrev, vNodeNext);

      if (isDiff) {
        this._injectTextNode(vNodePrevLast, vNodeNext);
      }

      isDiff = this._compareAttrs(vNodePrev, vNodeNext);

      if (isDiff) {
        this._injectAttr(vNodePrev, vNodeNext);
      }
    }
  }

  _injectTextNode(vNode: VirtualNode, textNode: VirtualNode | string) {
    if (vNode.HTMLElement instanceof HTMLElement) {
      vNode.HTMLElement.innerHTML = textNode as string;
      vNode.children = [textNode as string];
    }
  }

  _injectChilds(vNode: VirtualNode) {
    if (vNode.HTMLElement instanceof HTMLElement) {
      vNode.HTMLElement.innerHTML = '';
    }

    vNode.children.forEach((item) => {
      const child = item as VirtualNode;
      const element = createHTMLElement(child);

      child.HTMLElement = element;
      vNode.HTMLElement!.appendChild(element);
    });
  }

  _injectAttr(vPrev: VirtualNode, vNext: VirtualNode) {
    const attributes = Object.entries(vNext.attrs);

    attributes.forEach(([key, value]) => {
      if (vPrev.HTMLElement instanceof HTMLElement) {
        vPrev.HTMLElement.setAttribute(key, value);
        vPrev.attrs = vNext.attrs;
      }
    });
  }

  _compareInnerText(vPrev: VirtualNode, vNext: VirtualNode) {
    if (!(isStr(vPrev) || isNum(vPrev))) {
      return false;
    }
    return vPrev !== vNext;
  }

  _compareAttrs(vPrev: VirtualNode, vNext: VirtualNode) {
    if (isStr(vPrev) || isNum(vPrev)) {
      return false;
    }
    const nextAttrs = Object.entries(vNext.attrs).join();
    const prevAttrs = Object.entries(vPrev.attrs).join();
    return prevAttrs !== nextAttrs;
  }

  createState() {
    return {};
  }

  didMount() {

  }

  abstract create(state: State, props?: Props): VirtualNode;
}
