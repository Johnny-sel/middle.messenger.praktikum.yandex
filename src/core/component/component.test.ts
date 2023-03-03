import {ChatsPage} from '@app/pages';
import {VirtualNode} from '@core/types';
import {ChatPageState} from 'src/app/pages/ChatsPage/types';
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
    title: 'test chat title',
    unread_count: 123,
  },
];

let target: VirtualNode;
let vNode: VirtualNode;
let component: ChatsPage;
let state: ChatPageState;

describe('component', () => {
  beforeEach(() => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);

    component = new ChatsPage();
    vNode = component.init();
    state = component.state;

    createHTMLElement(vNode);
  });

  test('change children', () => {
    state.chats = chats;

    target = vNode.children[0] as VirtualNode;
    target = target.children[1] as VirtualNode;
    target = target.children[0] as VirtualNode;
    target = target.children[1] as VirtualNode;
    target = target.children[0] as VirtualNode;
    target = target.children[0] as VirtualNode;
    target = target.children[0] as VirtualNode;

    expect(target).toBe('test chat title');
  });

  test('after clear state', () => {
    component['isClearState'] = true;
    state.error = '';
    expect(component['vNodeNext']).toBe(undefined);
  });

  test('didMount', async () => {
    expect(component.didMount).toBeDefined();
  });

  test('didUpdate', () => {
    expect(component.didUpdate).toBeDefined();
  });

  test('mutationCallback', () => {
    const func = () => {
      component['mutationCallback'].call(component);
    };

    expect(func).not.toThrow();
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
