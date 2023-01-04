import { isArr } from '@core/utils';

function createVirtualComponent(ComponentInstance, props) {
  const instance = new ComponentInstance();
  const vNode = instance._init(undefined, props);
  return vNode;
};

function createVirtualNode(tag) {
  return function (...args) {
    let attrs = '';
    let children = [];
    let handlers = {};

    if (args.length > 3) {
      throw new Error('You pass more than 3 arguments to the component');
    }

    if (args.length === 1) {
      attrs = isArr(args[0]) ? '' : args[0];
      children = isArr(args[0]) ? args[0] : [];
    }

    if (args.length === 2) {
      attrs = args[0];
      children = args[1];
    }

    if (args.length === 3) {
      attrs = args[0];
      children = args[1];
      handlers = args[2];
    }

    return { tag, attrs, children, handlers };
  };
}

export { createVirtualNode, createVirtualComponent };
