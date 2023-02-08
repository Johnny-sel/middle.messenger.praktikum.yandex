import {ReasonResponse} from '@api/types';
import {first, isArr} from '@core/utils';
import {Component} from '@core/component';
import {onChange} from '@app/functions';
import {CHANGE_INPUT, CLEAR_INPUT, CLOSE_POPOVER, OPEN_POPOVER} from '@app/actions';
import {CONNECT_WEBSOCKET, GET_CHATS, SEND_MESSAGE} from '@app/actions';
import {OPEN_FIRST_CHAT, SCROLL_BOTTOM} from '@app/actions';
import {error} from '@app/constants';
import {ChatPageState, ConnectWebSoketPayload} from './types';
import {Message} from '@app/types';
import {Chat} from '@api/repositories';
import {WebSocketChat} from '@api/websocket/chat';

async function dispatch(type: string, payload: unknown) {
  const {state} = this as Component<ChatPageState>;

  try {
    switch (type) {
      case CHANGE_INPUT: {
        onChange.call(this, state.event);
        break;
      }

      case SCROLL_BOTTOM: {
        const div = document.querySelector('#messages')!;
        div.scrollTop = div.scrollHeight;
        break;
      }

      case GET_CHATS: {
        state.chats = [...(await Chat.getChats())];
        break;
      }

      case OPEN_POPOVER: {
        state.showPopover = true;
        break;
      }

      case CLOSE_POPOVER: {
        state.showPopover = false;
        break;
      }

      case OPEN_FIRST_CHAT: {
        const chat = first(state.chats);
        if (chat) {
          const chatId = chat?.id;
          const socket = WebSocketChat.instance;
          dispatch.call(this, CONNECT_WEBSOCKET, {socket, chatId});
        }
        break;
      }

      case CLEAR_INPUT: {
        const input: HTMLInputElement = document.querySelector('#message')!;
        state.inputData = {...state.inputData, message: ''};
        input.value = '';
        break;
      }

      case SEND_MESSAGE: {
        state.socket?.sendMessage(state.inputData.message);
        dispatch.call(this, CLEAR_INPUT);
        break;
      }

      case CONNECT_WEBSOCKET: {
        const {chatId, socket} = payload as ConnectWebSoketPayload;

        state.loadMessages = true;
        state.messages = [];
        state.selectedChatId = chatId;

        state.socket = await socket.connect({
          chatId,
          opened: () => {
            state.socket?.getMessages();
          },
          messages: (msg: Message[] | Message) => {
            state.messages = (isArr(msg) ? msg : [...state.messages, msg]) as Message[];
            state.loadMessages = false;
            dispatch.call(this, GET_CHATS);
            dispatch.call(this, SCROLL_BOTTOM);
          },
        });
        break;
      }
    }
  } catch (error) {
    // console.log('[error] ChatPage reducer:', error);
    handleError.call(this, error);
  }
}

function handleError(err: ReasonResponse) {
  const {state} = this as Component<ChatPageState, {}>;
  state.error = err.reason ?? error.unknown;
}

export {dispatch};
