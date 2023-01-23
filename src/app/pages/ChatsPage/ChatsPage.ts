import './ChatsPage.sass';
// core
import {div, component} from '@core/tags';
import {Component} from '@core/component';

//local
import {ChatPageState, chatPageState} from './state';
import {ChatList, MessageList} from '@app/modules';
import {IWebSocketChat} from '@api/types';

export default class ChatsPage extends Component<ChatPageState, {}> {
  constructor() {
    super();
  }

  createState() {
    return chatPageState;
  }

  async setWebSocketChat(socket: IWebSocketChat, chatId: string) {
    this.state.socket = await socket.connect({
      chatId: chatId,
      getMessages: (ev: MessageEvent<any>) => {
        this.state.messages = ev.data;
      },
      opened: () => {
        console.log('socket opened:');
        this.state.load = false;
      },
      closed: () => {
        console.log('socket closed:');
      },
      failed: () => {
        console.log('socket errro:');
      },
    });
  }

  sendMessage(message: string) {
    this.state.socket?.sendMessage(message);
  }

  create() {
    const {messages} = this.state;

    const setWebSocketChat = this.setWebSocketChat.bind(this);
    const sendMessage = this.sendMessage.bind(this);

    // prettier-ignore
    return (
      div('c=chats;', [
        // Left side
        component(ChatList, {setWebSocketChat}),
        // Messages
        component(MessageList, {messages, sendMessage}),
      ])
    );
  }
}
