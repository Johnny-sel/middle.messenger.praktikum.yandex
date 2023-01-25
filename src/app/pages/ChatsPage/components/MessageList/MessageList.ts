import './MessageList.sass';

import {button, component, footer, header, main, section, span} from '@core/tags';
import {Component} from '@core/component';
import {Input} from '@app/components';
import {Router} from '@core/router';
import {location, name} from '@app/constants';
import {inputs} from '@app/resources';
import {MessageListProps} from './types';
import {Message} from '../index';

const {searchMessage, sendMessage} = name;

const searchMessageInput = inputs.find((e) => e.name === searchMessage);
const sendMessageInput = inputs.find((e) => e.name === sendMessage);

export default class MessageList extends Component<{}, MessageListProps> {
  constructor() {
    super();
  }

  create() {
    const {messages, load, inputData, onChange, onSubmit} = this.props;

    const openHidden = messages.length > 0 || load ? 'hidden' : '';
    const loadHidden = load ? '' : 'hidden';
    const center = !openHidden || load ? 'center' : '';

    // prettier-ignore
    return (
      section('c=chats__messages;', [
        // top
        header('c=chats__messages__header;', [
          component(Input, {
            ...searchMessageInput,
            change: onChange,
            value: inputData['search_message'],
            className: 'chats__messages__header__search',
          }),
          button('c=chats__messages__header__account button; t=button; n=account', [],
              {click: () => Router.to(location.profile)},
          ),
        ]),
        // middle
        main(`c=chats__messages__message_items ${center}; id=messages`, [
          span(`c=chats__messages__message_items__info ${openHidden};`, ['Open any chat']),
          span(`c=chats__messages__message_items__info ${loadHidden};`, ['Loading messages...']),
          ...messages.map(message =>{
            return component(Message, {...message });
          })
        ]),
        // bottom
        footer('c=chats__messages__footer;', [
          button(`
              c=chats__messages__footer__attach button;
              t=button;
              n=attach file
            `, 
            []
          ),
          component(Input, {
            ...sendMessageInput,
            change: onChange,
            value: inputData['message'],
            className: 'chats__messages__footer__message',
          }),
          button(`
              c=chats__messages__footer__send button;
              t=button;
              n=send message;
            `,
            {click: onSubmit}
          ),
        ]),
      ])
    );
  }
}
