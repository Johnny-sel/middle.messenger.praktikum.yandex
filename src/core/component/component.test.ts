import {ChatsPage} from '@app/pages';

describe('component', () => {
  const component = new ChatsPage();

  test('init component', () => {
    const vNode = component.init();

    component.state.chats = [
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

    expect(vNode).toBeDefined();



  });

  test('init component, is init', () => {
    const vNode = component.init();
    component["isClearState"] = true;
    component.state.chats = [
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

    expect(vNode).toBeDefined();




  });

  test('proxy interspation', () => {});
});
