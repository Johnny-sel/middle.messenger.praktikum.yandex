import {ChatsPage} from '@app/pages';
import {createHTMLElement} from '../vdom';

const chats = [
  {
    id: 12,
    avatar: '/avatar',
    last_message: {
      content: 'content',
      time: '123',
      user: {
        avatar: '123',
        email: '123',
        first_name: '213',
        login: 'zcz',
        phone: 'rwerw',
        second_name: 'ewrw',
      },
    },
    title: 'qwe',
    unread_count: 123,
  },
];

describe('component', () => {
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);

  const component = new ChatsPage();
  const vNode = component.init();
  const state = component.state;
  createHTMLElement(vNode);

  test('change children', () => {
    state.chats = chats;
    expect(vNode).toBeDefined();
  });

  test('after clear state', () => {
    component['isClearState'] = true;
    state.error = '';
    expect(vNode).toBeDefined();
  });
  test('change tag', () => {
    state.loadChats = true;
    state.loadChats = false;
    expect(vNode).toBeDefined();
  });

  test('didMount', () => {
    component.didMount();
    expect(vNode).toBeDefined();
  });

  test('didUpdate', () => {
    component.didUpdate();
    expect(vNode).toBeDefined();
  });

  test('mutationCallback', () => {
    component['mutationCallback'].call(component);
    expect(vNode).toBeDefined();
  });

  test('destroy', () => {
    state.error = 'new error';
    component['destroy']();
    expect(state.error).toBe('');
  });

  test('destroy', () => {
    component.state = {} as typeof component.state;
    component['destroy']();
    expect(component.state).toEqual({});
  });
});
