import { isArr } from '@core/utils';

export const component = function (ComponentInstance, props) {
  const instance = new ComponentInstance();
  const vNode = instance._init(undefined, props);
  return vNode;
};

export const span = createVirtualNode('span');
export const p = createVirtualNode('p');
export const a = createVirtualNode('a');

export const div = createVirtualNode('div');
export const img = createVirtualNode('img');

export const h1 = createVirtualNode('h1');
export const h2 = createVirtualNode('img');
export const h3 = createVirtualNode('h3');
export const h4 = createVirtualNode('h4');
export const h5 = createVirtualNode('h5');
export const h6 = createVirtualNode('h6');

export const main = createVirtualNode('main');
export const header = createVirtualNode('header');
export const footer = createVirtualNode('footer');
export const aside = createVirtualNode('aside');
export const article = createVirtualNode('article');
export const section = createVirtualNode('section');

export const button = createVirtualNode('button');
export const input = createVirtualNode('input');
export const form = createVirtualNode('form');
export const label = createVirtualNode('label');

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
