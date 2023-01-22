import './ChatsPage.sass';
// core
import {div, section, footer, header, main, button, component} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {Input} from '@app/components';
import {inputs} from '@app/resources';
import {location, name} from '@app/constants';
//local
import {ChatPageState, chatPageState} from './state';
import {ChatList} from '@app/modules';

const {searchMessage, sendMessage} = name;

const searchMessageInput = inputs.find((e) => e.name === searchMessage);
const sendMessageInput = inputs.find((e) => e.name === sendMessage);

export default class ChatsPage extends Component<ChatPageState, {}> {
  constructor() {
    super();
  }

  createState() {
    return chatPageState;
  }

  onChange(event: InputEvent) {
    const name = (event.target as any).name;
    const value = (event.target as any).value;
    this.state.data = {...this.state.data, [name]: value};
  }

  create() {
    const {data} = this.state;

    const onChange = this.onChange.bind(this);

    // prettier-ignore
    return (
      div('c=chats;', [
        // Left side
        component(ChatList),
        // Messages
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
            button('c=chats__messages__footer__attach button; t=button; n=attach file', []),
            component(Input, {
              ...sendMessageInput,
              change: onChange,
              value: data['message'],
              className: 'chats__messages__footer__message',
            }),
            button('c=chats__messages__footer__send button; t=button; n=send message', []),
          ]),
        ]),
      ])
    );
  }
}
