import {isStr, isNum, isArr, isDiffLength, random, deepCopy, isObject} from '../utils';
import {createHTMLElement} from '../vdom/dom';
import {Props, IComponent, VirtualNode} from '../types';

export abstract class Component<State> implements IComponent<State> {
  vNodeNext: VirtualNode;
  vNodeCurrent: VirtualNode;
  state: State;
  initState: State;
  props: Props;
  componentId: string;
  observer: MutationObserver;
  isClearState: boolean;

  constructor() {
    this.isClearState = false;
    this.componentId = random().toString();
    this.state = this._setState(this.createState()) as State;
    this.initState = deepCopy(this.state) as State;
    setTimeout(() => this.didMount(), 0);
  }

  _init(props: Props) {
    this.props = props;
    this.vNodeCurrent = this.create();
    this.vNodeCurrent.attrs['data-comp'] = this.componentId;

    this._observer(this.componentId);

    return this.vNodeCurrent;
  }

  _setState(initialState: State) {
    return new Proxy(initialState as object, {
      set: this._interception.bind(this),
    }) as State;
  }

  _interception(state: any, prop: string, newValue: any) {
    state[prop] = newValue;
    if (this.isClearState) return true;

    this.vNodeNext = this.create();
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

  _observer(componentId: string) {
    this.observer = new MutationObserver(() => {
      const selector = `[data-comp="${componentId}"]`;
      const component = document.querySelector(selector);
      const inDom = document.body.contains(component);

      if (!inDom) {
        this._destroy();
      }
    });

    const rootElement = document.querySelector('#root')!;
    this.observer.observe(rootElement, {childList: true});
  }

  unMount() {}

  _destroy() {
    this.observer.disconnect();
    this._clearState();
    this.unMount();
  }

  _clearState() {
    this.isClearState = true;
    const stack = [this.state];
    const initStack = [this.initState];

    while (stack.length > 0) {
      const state = stack.pop();
      const initState = initStack.pop();

      for (const key in state) {
        if (Object.prototype.hasOwnProperty.call(state, key)) {
          const value = (state as any)[key];
          const initValue = (initState as any)[key];
          if (isObject(value) && isObject(initValue)) {
            stack.push(value);
            initStack.push(initValue);
          } else {
            state[key] = initValue;
          }
        }
      }
    }
    this.isClearState = false;
  }

  createState(): State {
    return {} as State;
  }

  /* eslint-disable */
  didMount() {}

  abstract create(): VirtualNode;
}
