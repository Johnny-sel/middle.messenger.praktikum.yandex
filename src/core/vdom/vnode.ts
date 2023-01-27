import {isArr, isObject} from '../utils';
import {parseAttrs} from './parse';
import {FunctionVirtualNode, ComponentStack, VirtualNode, Props, Component} from '../types';

function createVirtualComponent(Component: Component, props: Props): VirtualNode {
  const key = props.key;
  const stack = this.stack as ComponentStack;
  const finded = stack.find((e) => e.key === key);

  if (finded) {
    const component = finded.component;
    const vNode = component._init(props);
    return vNode;
  }

  const component = new Component();
  const vNode = component._init(props);

  this.stack.push({key, component});

  return vNode;
}

function createVirtualNode(tag: string): FunctionVirtualNode {
  return function (...args: any[]) {
    let attrsStr = '';
    let children = [];
    let handlers = {};

    if (args.length > 3) {
      throw new Error('You pass more than 3 arguments to the component');
    }

    if (args.length === 1) {
      attrsStr = isArr(args[0]) ? '' : args[0];
      children = isArr(args[0]) ? args[0] : [];
    }

    if (args.length === 2) {
      attrsStr = args[0];
      children = isArr(args[1]) ? args[1] : [];
      handlers = isObject(args[1]) ? args[1] : [];
    }

    if (args.length === 3) {
      attrsStr = args[0];
      children = args[1];
      handlers = args[2];
    }

    const attrs = parseAttrs(attrsStr);

    return {tag, attrs, children, handlers};
  };
}

export {createVirtualNode, createVirtualComponent};
