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
import {
  CHANGE_INPUT,
  CLEAR_INPUT,
  CONNECT_WEBSOCKET,
  GET_CHATS,
  SCROLL_BOTTOM,
  SEND_MESSAGE,
} from '@app/actions';
import {dispatch} from './reducer';

export default class ChatsPage extends Component<ChatPageState, {}> {
  constructor() {
    super();
  }

  createState() {
    return chatPageState;
  }

  scrollBottom() {
    dispatch.call(this, SCROLL_BOTTOM);
  }

  clearInput() {
    dispatch.call(this, CLEAR_INPUT);
  }

  setWebSocketChat(socket: IWebSocketChat, chatId: number) {
    dispatch.call(this, CONNECT_WEBSOCKET, {socket, chatId});
  }

  onChange(event: InputEvent) {
    this.state.event = event;
    dispatch.call(this, CHANGE_INPUT);
  }

  onSubmit() {
    dispatch.call(this, SEND_MESSAGE);
  }

  didMount() {
    dispatch.call(this, GET_CHATS);
  }

  create() {
    const {messages, load, inputData, chats} = this.state;

    const setWebSocketChat = this.setWebSocketChat.bind(this);
    const onChange = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);

    // prettier-ignore
    return (
      div('c=chats;', [
        component(ChatList, {setWebSocketChat, chats}),
        component(MessageList, {messages, load, onChange, onSubmit, inputData}),
      ])
    );
  }
}
