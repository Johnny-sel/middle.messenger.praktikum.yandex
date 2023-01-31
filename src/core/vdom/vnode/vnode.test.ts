import {Component} from '../../component/component';
import {button} from '../tags/tags';
import {createVirtualComponent, createVirtualNode} from './vnode';

class Button extends Component {
  constructor() {
    super();
  }

  create() {
    return button(`c=button; t=button;`, ['Button name']);
  }
}

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

  test('createVirtualComponent function should be return object with property tag', () => {
    const btn = new Button();
    btn._init({});
    const vnode = createVirtualComponent.call(btn, Button, {key: '1'});

    expect(vnode).toEqual({
      tag: 'button',
      attrs: {type: 'button', class: 'button', 'data-key': vnode.attrs['data-key']},
      children: ['Button name'],
      handlers: {},
    });
  });

  test('createVirtualComponent function should be return object with property tag', () => {
    const btn = new Button();
    btn._init({});
    btn.stack.push({key: '1', component: btn});
    const vnode = createVirtualComponent.call(btn, Button, {key: '1'});

    expect(vnode).toEqual({
      tag: 'button',
      attrs: {type: 'button', class: 'button', 'data-key': vnode.attrs['data-key']},
      children: ['Button name'],
      handlers: {},
    });
  });
});
