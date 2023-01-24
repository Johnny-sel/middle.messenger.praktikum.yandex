import './Styles.sass';

import {button, component, footer, header, main, section} from '@core/tags';
import {Component} from '@core/component';
import {Input} from '@app/components';
import {Router} from '@core/router';
import {location, name} from '@app/constants';
import {inputs} from '@app/resources';
import {messageListState} from './State';
import {MessageListProps, MessageListState} from './Types';

const {searchMessage, sendMessage} = name;

const searchMessageInput = inputs.find((e) => e.name === searchMessage);
const sendMessageInput = inputs.find((e) => e.name === sendMessage);

export default class MessageList extends Component<MessageListState, MessageListProps> {
  constructor() {
    super();
  }

  createState() {
    return messageListState;
  }

  onChange(event: InputEvent) {
    const name = (event.target as any).name;
    const value = (event.target as any).value;
    this.state.data = {...this.state.data, [name]: value};
  }

  onSubmit() {
    this.props.sendMessage(this.state.data.message);
  }

  create() {
    const {data} = this.state;
    const {messages} = this.props;
    console.log('messages:', messages);

    const onChange = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);

    // prettier-ignore
    return (
      section('c=chats__messages;', [
        // top
        header('c=chats__messages__header;', [
          component(Input, {
            ...searchMessageInput,
            change: onChange,
            value: data['search_message'],
            className: 'chats__messages__header__search',
          }),
          button('c=chats__messages__header__account button; t=button; n=account', [],
              {click: () => Router.to(location.profile)},
          ),
        ]),
        // middle
        main('c=chats__messages__message_items;', [

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
            value: data['message'],
            className: 'chats__messages__footer__message',
          }),
          button(`
              c=chats__messages__footer__send button;
              t=button;
              n=send message;
            `,
            [], {click: onSubmit}
          ),
        ]),
      ])
    );
  }
}
