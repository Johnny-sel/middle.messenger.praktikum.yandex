import './ChatsPage.sass';

import { div, aside, section, footer, header, main, nav, button, input } from '@core/tags';
import { Component } from '@core/component';

export default class ChatsPage extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      div('c=chats;', [
        aside('c=chats__list;', [
          header('c=chats__list__header;', [
            nav('c=chats__list__header__nav;', [
              button('c=chats__list__header__nav__menu button; t=button; n=menu', []),
            ]),
            input(`c=chats__list__header_search input; t=text; n=message ; p=Search chat;`, [], {}),
          ]),
          section('c=chats__list__items;', [
            ...[1, 2, 3, 4, 5, 6].map(
              () => {
                return div('c=chats__list__items__item;', ['Chat Item'])
              })
          ]),
        ]),
        section('c=chats__messages;', [
          header('c=chats__messages__header;', [
            input(`c=chats__messages__header__search input; t=text; n=message ; p=Search message;`, [], {}),
            button('c=chats__messages__header__account button; t=button; n=account', []),
          ]),
          main('c=chats__messages__message_list;', []),
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
