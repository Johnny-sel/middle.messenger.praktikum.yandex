import {VirtualNode} from '@core/types';
import {createHTMLElement} from './dom';

describe('dom', () => {
  test('createHTMLElement function should be return dom elemnt from object', () => {
    const vNode: VirtualNode = {
      tag: 'section',
      attrs: {
        class: 'section',
      },
      children: [
        {
          tag: 'form',
          attrs: {
            class: 'form',
          },
          children: [
            {
              tag: 'div',
              attrs: {
                class: 'form__input input_group',
                'data-key': '881032228',
              },
              children: [
                {
                  tag: 'input',
                  attrs: {
                    class: 'input_group__input input',
                    id: 'newPassword',
                    value: '',
                    type: 'password',
                    name: 'newPassword',
                    placeholder: 'New Password',
                    pattern:
                      '^(?=^.{8,40}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$',
                  },
                  children: [],
                  handlers: {},
                  HTMLElement: undefined,
                },
                {
                  tag: 'span',
                  attrs: {
                    class: 'input_group__error',
                  },
                  children: ['Invalid password'],
                  handlers: [],
                  HTMLElement: undefined,
                },
              ],
              handlers: [],
              HTMLElement: undefined,
            },
            {
              tag: 'div',
              attrs: {
                class: 'form__input input_group',
                'data-key': '618599344',
              },
              children: [
                {
                  tag: 'input',
                  attrs: {
                    class: 'input_group__input input',
                    id: 'oldPassword',
                    value: '',
                    type: 'password',
                    name: 'oldPassword',
                    placeholder: 'Old Password',
                    pattern:
                      '^(?=^.{8,40}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$',
                  },
                  children: [],
                  handlers: {},
                  HTMLElement: undefined,
                },
                {
                  tag: 'span',
                  attrs: {
                    class: 'input_group__error',
                  },
                  children: ['Invalid password'],
                  handlers: [],
                  HTMLElement: undefined,
                },
              ],
              handlers: [],
              HTMLElement: undefined,
            },
            {
              tag: 'button',
              attrs: {
                class: 'form__button button',
                type: 'submit',
                'data-key': '180513777',
              },
              children: ['Change password'],
              handlers: {},
              HTMLElement: undefined,
            },
          ],
          handlers: [],
          HTMLElement: undefined,
        },
        {
          tag: 'span',
          attrs: {
            class: 'hidden',
          },
          children: [''],
          handlers: [],
          HTMLElement: undefined,
        },
        {
          tag: 'a',
          attrs: {
            class: 'link',
          },
          children: ['Go to account'],
          handlers: {
            click: () => {},
          },
          HTMLElement: undefined,
        },
      ],
      handlers: [],
      HTMLElement: undefined,
    };

    expect(createHTMLElement('text') instanceof Text).toBe(true);
    expect(createHTMLElement(1234) instanceof Text).toBe(true);
    expect(createHTMLElement(vNode) instanceof HTMLElement).toBe(true);
  });
});
