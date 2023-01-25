import './ChatPage.sass';
// api
import {IWebSocketChat} from '@api/types';
// core
import {div, component} from '@core/tags';
import {Component} from '@core/component';
//local
import {chatPageState} from './state';
import {ChatList, MessageList} from './components';
import {ChatPageState} from './types';
import {isArr} from '@core/utils';

export default class ChatsPage extends Component<ChatPageState, {}> {
  constructor() {
    super();
  }

  createState() {
    return chatPageState;
  }

  scrollBottom() {
    const div = document.querySelector('#messages')!;
    div.scrollTop = div.scrollHeight;
  }

  async setWebSocketChat(socket: IWebSocketChat, chatId: string) {
    this.state.load = true;
    this.state.messages = [];
    this.state.socket = await socket.connect({
      chatId: chatId,
      getMessages: (ev: MessageEvent<any>) => {
        const data = JSON.parse(ev.data);
        this.state.messages = isArr(data) ? (data as []).reverse() : [...this.state.messages, data];
        this.state.load = false;
        this.scrollBottom();
      },
      opened: () => {
        console.log('socket opened:');
        this.state.socket?.getMessages();
      },
      closed: () => {
        console.log('socket closed:');
      },
      failed: () => {
        console.log('socket errro:');
      },
    });
  }

  onChange(event: InputEvent) {
    const name = (event.target as any).name;
    const value = (event.target as any).value;
    this.state.data = {...this.state.data, [name]: value};
  }

  onSubmit() {
    this.state.socket?.sendMessage(this.state.data.message);
  }

  create() {
    const {messages, load} = this.state;

    const setWebSocketChat = this.setWebSocketChat.bind(this);
    const onChange = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);

    // prettier-ignore
    return (
      div('c=chats;', [
        // Left side
        component(ChatList, {setWebSocketChat}),
        // Messages
        component(MessageList, {messages, load, onChange, onSubmit}),
      ])
    );
  }
}
