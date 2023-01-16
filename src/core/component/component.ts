import {isStr, isNum, isArr, isDiffLength} from '../utils';
import {createHTMLElement} from '../vdom/dom';
import {Props, IComponent, VirtualNode} from '../types';

export abstract class Component<State> implements IComponent<State> {
  vNodeNext: VirtualNode;
  vNodeCurrent: VirtualNode;
  state: State;
  props: Props;

  constructor() {
    this.state = this._setState(this.createState()) as State;
    setTimeout(() => this.didMount(this.state, this.props), 0);
  }

  _init(props: Props) {
    this.props = props;
    this.vNodeCurrent = this.create(this.state, this.props);
    return this.vNodeCurrent;
  }

  _setState(initialState: State) {
    return new Proxy(initialState as object, {
      set: this._interception.bind(this),
    }) as State;
  }

  _interception(state: any, prop: string, newValue: any) {
    state[prop] = newValue;
    this.vNodeNext = this.create(state);
    this._injectHTML();
    return true;
  }

  _injectHTML() {
    let isDiff = false;

    const stackPrev = [this.vNodeCurrent];
    const stackNext = [this.vNodeNext];

    let vNodePrevLast = this.vNodeCurrent;
    let vNodeNextLast = this.vNodeNext;

    while (stackPrev.length > 0 || stackNext.length > 0) {
      const vNodePrev: VirtualNode | string = stackPrev.pop()!;
      const vNodeNext: VirtualNode | string = stackNext.pop()!;

      if (isDiffLength(stackPrev, stackNext)) {
        vNodePrevLast.children = vNodeNextLast.children;
        this._injectChilds(vNodePrevLast);
        break;
      }

      if (isArr<unknown>(vNodePrev.children)) {
        vNodePrevLast = vNodePrev;
        stackPrev.push(...(vNodePrev.children as []));
      }

      if (isArr<unknown>(vNodeNext.children)) {
        vNodeNextLast = vNodeNext;
        stackNext.push(...(vNodeNext.children as []));
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
    if (!(vPrev.HTMLElement instanceof HTMLElement)) return;

    const attrsNext = Object.entries(vNext.attrs);
    const attrsPrev = Object.entries(vPrev.attrs);

    let isDisabled = false;

    attrsNext.forEach(([nextKey, nextValue]) => {
      attrsPrev.forEach(([prevKey, prevValue]) => {
        if (!(vPrev.HTMLElement instanceof HTMLElement)) return;

        if (nextKey === 'disabled') isDisabled = true;
        if (nextKey !== prevKey) return;
        if (prevValue === nextValue) return;

        vPrev.HTMLElement.removeAttribute(prevKey);
        vPrev.HTMLElement.setAttribute(nextKey, nextValue);
      });
    });

    if (isDisabled) {
      vPrev.HTMLElement.setAttribute('disabled', '');
    } else {
      vPrev.HTMLElement.removeAttribute('disabled');
    }

    vPrev.attrs = vNext.attrs;
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

  createState(): State {
    return {} as State;
  }

  /* eslint-disable */
  didMount(_: State, __: Props) {}

  abstract create(state: State, props?: Props): VirtualNode;
}
