import { isArr } from '../utils';
import { parseAttrs } from './parse';
import { FunctionVirtualNode, Props, VirtualNode } from '../types';

function createVirtualComponent(ComponentInstance: any, props?: Props): VirtualNode {
  const instance = new ComponentInstance();
  const vNode = instance._init(props);
  return vNode;
};

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
      children = args[1];
    }

    if (args.length === 3) {
      attrsStr = args[0];
      children = args[1];
      handlers = args[2];
    }

    const attrs = parseAttrs(attrsStr);


    return { tag, attrs, children, handlers };
  };
}

export { createVirtualNode, createVirtualComponent };
