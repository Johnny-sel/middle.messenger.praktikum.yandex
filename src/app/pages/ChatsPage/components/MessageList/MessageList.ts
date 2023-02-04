import './MessageList.sass';

import {button, component, footer, header, main, section, span} from '@core/tags';
import {Component} from '@core/component';
import {Input, Spinner} from '@app/components';
import {Router} from '@core/router';
import {location, name} from '@app/constants';
import {inputs} from '@app/resources';
import {MessageListProps} from './types';
import {Message} from '../index';

const searchMessageInput = inputs.find((e) => e.name === name.searchMessage);
const sendMessageInput = inputs.find((e) => e.name === name.sendMessage);

export default class MessageList extends Component<{}, MessageListProps> {
  constructor() {
    super();
  }

  create() {
    const {messages: msgs, loadMessages, inputData} = this.props;
    const {onChange, onSubmit, selectedChatId} = this.props;

    const notSelectedChat = selectedChatId === 0;
    const haveNotMessages = msgs.length === 0;
    const center = haveNotMessages || notSelectedChat || loadMessages ? 'center' : '';
    const messages = msgs.map((msg) => component.call(this, Message, {...msg, key: msg.id}));

    // prettier-ignore
    return (
      section('c=chats__messages;', [
        // top
        header('c=chats__messages__header;', [
          component.call(this, Input, {
            ...searchMessageInput,
            change: onChange,
            key: '1',
            value: inputData['search_message'],
            className: 'chats__messages__header__search',
          }),
          button('c=chats__messages__header__account button; t=button; n=account',
            {click: () => Router.to(location.profile)},
          ),
        ]),
        // middle
        main(`c=chats__messages__message_items ${center}; id=messages`,
          notSelectedChat ? [span(`c=chats__messages__message_items__info;`, ['OPEN ANY CHAT'])]
            : loadMessages ? [component.call(this, Spinner,{key: '2'})]
                : haveNotMessages ? [span(`c=chats__messages__message_items__info;`, ['SEND MESSAGE'])]
                  : [...messages]
        ),
        // bottom
        footer('c=chats__messages__footer;', [
          button(`c=chats__messages__footer__attach button; t=button; n=attach file;`,
            {click: onSubmit}
          ),
          component.call(this, Input, {
            ...sendMessageInput,
            change: onChange,
            key: '3',
            value: inputData['message'],
            className: 'chats__messages__footer__message',
          }),
          button(`c=chats__messages__footer__send button; t=button; n=send message;`,
            {click: onSubmit}
          ),
        ]),
      ])
    );
  }
}
