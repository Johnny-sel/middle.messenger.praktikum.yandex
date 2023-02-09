import './ChatPage.sass';
// api
import {IWebSocketChat} from '@api/types';
// core
import {div, component} from '@core/tags';
import {Component} from '@core/component';
//app
import {CHANGE_INPUT, CLEAR_INPUT, CLOSE_POPOVER, OPEN_POPOVER} from '@app/actions';
import {OPEN_FIRST_CHAT, CONNECT_WEBSOCKET} from '@app/actions';
import {GET_CHATS, SCROLL_BOTTOM, SEND_MESSAGE} from '@app/actions';
//local
import {chatPageState} from './state';
import {ChatList, MessageList} from './components';
import {ChatPageState} from './types';
import {dispatch} from './reducer';

export default class ChatsPage extends Component<ChatPageState> {
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

  getChats() {
    dispatch.call(this, GET_CHATS);
  }

  openPopover() {
    dispatch.call(this, OPEN_POPOVER);
  }

  closePopover() {
    dispatch.call(this, CLOSE_POPOVER);
  }

  async didMount() {
    await dispatch.call(this, GET_CHATS);
    await dispatch.call(this, OPEN_FIRST_CHAT);
  }

  create() {
    const {messages, loadMessages, loadChats} = this.state;
    const {inputData, chats, selectedChatId, showPopover} = this.state;

    const onChange = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);
    const getChats = this.getChats.bind(this);

    const setWebSocketChat = this.setWebSocketChat.bind(this);
    const closePopover = this.closePopover.bind(this);
    const openPopover = this.openPopover.bind(this);

    // prettier-ignore
    return (
      div('c=chats;', [
        component.call(this, ChatList, {
          key: '1',
          setWebSocketChat,
          getChats,
          loadChats,
          selectedChatId,
          chats,
        }),
        component.call(this, MessageList, {
          key: '2',
          loadMessages,
          showPopover,
          messages,
          inputData,
          selectedChatId,
          onChange,
          onSubmit,
          openPopover,
          closePopover
        }),
      ], {click: closePopover}
      )
    );
  }
}
