import {isStr, isNum, isArr, isDiffLength, random, deepCopy, isObject} from '../utils';
import {createHTMLElement} from '../vdom/dom/dom';
import {RegisteredComponent, VirtualNode, vNode} from '../types';

export abstract class Component<State = {}, Props = {}> {
  public state: State;
  public props: Props;

  private vNodeNext: VirtualNode;
  private vNodeCurrent: VirtualNode;
  private initState: State;
  private observer: MutationObserver;
  private isClearState: boolean;

  public key: string;
  public stack: RegisteredComponent[];

  constructor() {
    this.key = random().toString();
  }

  public init(props?: Props) {
    this.stack = [];
    this.isClearState = false;

    this.state = this.getProxyState(this.createState());
    this.initState = deepCopy(this.state) as State;

    this.props = props || ({} as Props);

    this.vNodeCurrent = this.create();
    this.vNodeCurrent.attrs['data-key'] = this.key;

    this.observe();

    return this.vNodeCurrent;
  }

  private mutationCallback() {
    const component = document.querySelector(`[data-key="${this.key}"]`);
    const inDom = document.body.contains(component);
    inDom ? this.didMount() : this.destroy();
  }

  private observe() {
    const root = document.querySelector('#root');
    if (!root) return;
    this.observer = new MutationObserver(this.mutationCallback.bind(this));
    this.observer.observe(root, {childList: true});
  }

  private destroy() {
    this.observer.disconnect();
    this.clearState();
    this.unMount();
  }

  public reCreate(props: Props) {
    this.props = props;
    return this.create();
  }

  private getProxyState(state: State) {
    return new Proxy(state as Record<string, unknown>, {
      set: this.trap.bind(this),
    }) as State;
  }

  private trap(state: Record<string, unknown>, prop: string, newValue: unknown) {
    state[prop] = newValue;

    if (this.isClearState) {
      return true;
    }

    this.vNodeNext = this.create();
    this.injectHTML();
    return true;
  }

  private injectHTML() {
    let isDiff = false;

    const stackCurr = [this.vNodeCurrent];
    const stackNext = [this.vNodeNext];

    let vNodeCurrLast = this.vNodeCurrent;
    let vNodeNextLast = this.vNodeNext;

    while (stackCurr.length > 0 || stackNext.length > 0) {
      const vNodeCurr: vNode = stackCurr.pop()!;
      const vNodeNext: vNode = stackNext.pop()!;

      // children
      if (isDiffLength(stackCurr, stackNext)) {
        vNodeCurrLast.children = vNodeNextLast.children;
        this.injectChilds(vNodeCurrLast);
        break;
      }

      if (isArr(vNodeCurr.children)) {
        vNodeCurrLast = vNodeCurr;
        stackCurr.push(...(vNodeCurr.children as []));
      }

      if (isArr(vNodeNext.children)) {
        vNodeNextLast = vNodeNext;
        stackNext.push(...(vNodeNext.children as []));
      }

      // handlers
      isDiff = this.compareHandlers(vNodeCurr, vNodeNext);
      if (isDiff) {
        this.injectHandlers(vNodeCurrLast, vNodeNext);
      }

      // attributes
      isDiff = this.compareAttrs(vNodeCurr, vNodeNext);
      if (isDiff) {
        this.injectAttr(vNodeCurr, vNodeNext);
      }

      // tags
      isDiff = this.compareTags(vNodeCurr, vNodeNext);
      if (isDiff) {
        this.injectTags(vNodeCurrLast, vNodeNext);
      }

      // inner text
      isDiff = this.compareInnerText(vNodeCurr, vNodeNext);
      if (isDiff) {
        this.injectTextNode(vNodeCurrLast, vNodeNext);
      }
    }
  }

  private injectTags(vPrev: VirtualNode, vNext: VirtualNode) {
    if (!(vPrev.HTMLElement instanceof HTMLElement)) return;
    const element = createHTMLElement(vNext);
    vPrev.HTMLElement.replaceWith(element);
    vPrev.tag = vNext.tag;
    vPrev.HTMLElement = element;
  }

  private injectTextNode(vNode: VirtualNode, textNode: VirtualNode | string) {
    if (vNode.HTMLElement instanceof HTMLElement) {
      vNode.HTMLElement.innerHTML = textNode as string;
      vNode.children = [textNode as string];
    }
  }

  private injectChilds(vNode: VirtualNode) {
    const isTextNode = vNode.children.length === 1 && isStr(vNode.children[0]);

    if (vNode.HTMLElement instanceof HTMLElement) {
      const textNode = isTextNode ? (vNode.children[0] as string) : '';
      vNode.HTMLElement.innerHTML = textNode;
    }

    if (isTextNode) return;

    vNode.children.forEach((item) => {
      const child = item as VirtualNode;
      const element = createHTMLElement(child);

      child.HTMLElement = element;
      vNode.HTMLElement?.appendChild(element);
    });
  }

  private injectHandlers(vPrev: VirtualNode, vNext: VirtualNode) {
    if (!(vPrev.HTMLElement instanceof HTMLElement)) return;

    const handlersPrev = Object.entries(vPrev.handlers);
    const handlersNext = Object.entries(vNext.handlers);

    handlersPrev.forEach(([prevKey, prevValue]) => {
      handlersNext.forEach(([nextKey, nextValue]) => {
        if (!(vPrev.HTMLElement instanceof HTMLElement)) return;

        if (nextKey !== prevKey) return;
        if (prevValue === nextValue) return;

        vPrev.HTMLElement.removeEventListener(prevKey, prevValue);
        vPrev.HTMLElement.addEventListener(nextKey, nextValue);
      });
    });

    vPrev.handlers = vNext.handlers;
  }

  private injectAttr(vPrev: VirtualNode, vNext: VirtualNode) {
    if (!(vPrev.HTMLElement instanceof HTMLElement)) return;

    const attrsNext = Object.entries(vNext.attrs);
    const attrsPrev = Object.entries(vPrev.attrs);

    let isDisabled = false;

    attrsPrev.forEach(([prevKey, prevValue]) => {
      attrsNext.forEach(([nextKey, nextValue]) => {
        if (!(vPrev.HTMLElement instanceof HTMLElement)) return;

        if (nextKey === 'disabled') isDisabled = true;
        if (nextKey !== prevKey) return;
        if (prevValue === nextValue) return;

        vPrev.HTMLElement.removeAttribute(prevKey);
        vPrev.HTMLElement.setAttribute(nextKey, nextValue);
      });
    });

    if (isDisabled) vPrev.HTMLElement.setAttribute('disabled', '');
    else vPrev.HTMLElement.removeAttribute('disabled');

    vPrev.attrs = vNext.attrs;
  }

  private compareInnerText(vPrev: VirtualNode, vNext: VirtualNode) {
    if (!(isStr(vPrev) || isNum(vPrev))) return false;
    return vPrev !== vNext;
  }

  private compareTags(vPrev: VirtualNode, vNext: VirtualNode) {
    return vPrev.tag !== vNext.tag;
  }

  private compareHandlers(vPrev: VirtualNode, vNext: VirtualNode) {
    if (isStr(vPrev) || isNum(vPrev)) return false;

    const prevKeys = Object.keys(vPrev.handlers).join().trim();
    const nextKeys = Object.keys(vNext.handlers).join().trim();

    if (!prevKeys && !nextKeys) return false;

    if (prevKeys !== nextKeys) return true;

    const prevHandlers = Object.values(vPrev.handlers);
    const nextHandlers = Object.values(vNext.handlers);

    for (let i = 0; i < prevHandlers.length; i++) {
      const prevHandler = prevHandlers[i];
      const nextHandler = nextHandlers[i];
      if (prevHandler !== nextHandler) return true;
    }

    return false;
  }

  private compareAttrs(vPrev: VirtualNode, vNext: VirtualNode) {
    if (isStr(vPrev) || isNum(vPrev)) return false;

    const prevAttrs = Object.entries(vPrev.attrs).join();
    const nextAttrs = Object.entries(vNext.attrs).join();

    return prevAttrs !== nextAttrs;
  }

  private clearState() {
    this.isClearState = true;

    const stack = [this.state];
    const initStack = [this.initState];

    while (stack.length > 0) {
      const state = stack.pop() as Record<string, unknown>;
      const initState = initStack.pop() as Record<string, unknown>;

      for (const key in state) {
        const value = state[key];
        const initValue = initState[key];

        if (isObject(value) && isObject(initValue)) {
          stack.push(value as State);
          initStack.push(initValue as State);
        } else {
          state[key] = initValue;
        }
      }
    }

    this.isClearState = false;
  }

  public createState(): State {
    return {} as State;
  }

  /* eslint-disable */
  public didMount() {}
  public didUpdate() {}
  public unMount() {}

  abstract create(): VirtualNode;
}
