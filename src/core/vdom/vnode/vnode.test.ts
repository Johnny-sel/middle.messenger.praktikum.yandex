import {createVirtualNode} from './vnode';

describe('vnode', () => {
  const span = createVirtualNode('span');

  test('createVirtualNode function should be return object with property tag', () => {
    const testFunc = () => {
      span('c=text', [], {}, {});
    };

    expect(testFunc).toThrowError('You pass more than 3 arguments to the component');
    expect(typeof span).toEqual('function');

    expect(span()).toEqual({
      tag: 'span',
      children: [],
      attrs: {},
      handlers: {},
      HTMLElement: undefined,
    });
    expect(span(['title'])).toEqual({
      tag: 'span',
      children: ['title'],
      attrs: {},
      handlers: {},
      HTMLElement: undefined,
    });
    expect(span('c=text')).toEqual({
      tag: 'span',
      children: [],
      attrs: {class: 'text'},
      handlers: {},
      HTMLElement: undefined,
    });
    expect(span('c=text', ['title'])).toEqual({
      tag: 'span',
      children: ['title'],
      attrs: {class: 'text'},
      handlers: {},
      HTMLElement: undefined,
    });
    expect(span('c=text', {click: 'clickFunction'})).toEqual({
      tag: 'span',
      children: [],
      attrs: {class: 'text'},
      handlers: {click: 'clickFunction'},
      HTMLElement: undefined,
    });
    expect(span('c=text', ['title'], {click: 'clickFunction'})).toEqual({
      tag: 'span',
      children: ['title'],
      attrs: {class: 'text'},
      handlers: {click: 'clickFunction'},
      HTMLElement: undefined,
    });
  });
});
