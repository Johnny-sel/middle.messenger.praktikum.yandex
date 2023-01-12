import './ChatsPage.sass';

import { div, aside, section, footer, header, main, nav, button, input, ul, component } from '@core/tags';
import { Component } from '@core/component';
import { ChatListItem } from '@app/components';

export default class ChatsPage extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      div('c=chats;', [
        // Left side
        aside('c=chats__list;', [
          // top
          header('c=chats__list__header;', [
            nav('c=chats__list__header__nav;', [
              button('c=chats__list__header__nav__menu button; t=button; n=menu', []),
            ]),
            input(`c=chats__list__header_search input; t=text; n=message ; p=Search chat;`, [], {}),
          ]),
          // chats items
          ul('c=chats__list__items;', [
            ...[1, 2, 3, 4, 5, 6].map(() => {
              return component(ChatListItem)
            })
          ]),
        ]),
        // Messages
        section('c=chats__messages;', [
          // top
          header('c=chats__messages__header;', [
            input(`c=chats__messages__header__search input; t=text; n=message ; p=Search message;`, [], {}),
            button('c=chats__messages__header__account button; t=button; n=account', []),
          ]),
          // middle
          main('c=chats__messages__message_items;', [

          ]),
          // bottom
          footer('c=chats__messages__footer;', [
            button('c=chats__messages__footer__attach button; t=button; n=attach file', []),
            input(`c=chats__messages__footer__message input; t=text; n=message ; p=Message;`, [], {}),
            button('c=chats__messages__footer__send button; t=button; n=send message', []),
          ]),
        ]),
      ])
    );
  }
}
