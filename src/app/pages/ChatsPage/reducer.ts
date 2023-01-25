import {SCROLL_BOTTOM} from './../../actions/index';
import {ReasonResponse} from '@api/types';
import {isArr} from '@core/utils';
import {Component} from '@core/component';
import {onChange} from '@app/functions';
import {CHANGE_INPUT, CLEAR_INPUT, CONNECT_WEBSOCKET, GET_CHATS, SEND_MESSAGE} from '@app/actions';
import {error} from '@app/constants';
import {ChatPageState, ConnectWebSoketPayload} from './types';
import {Chat} from '@api/repositories';
import {Message} from '@app/types';

async function dispatch(type: string, payload: unknown) {
  const {state} = this as Component<ChatPageState, {}>;

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
        state.load = true;
        state.chats = await Chat.getChats();
        state.load = false;
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
        const chat = state.chats.find((e) => e.id === state.selectedChatId)!;
        chat.last_message.content = state.inputData.message;
        dispatch.call(this, CLEAR_INPUT);
        break;
      }

      case CONNECT_WEBSOCKET: {
        const {chatId, socket} = payload as ConnectWebSoketPayload;

        state.load = true;
        state.messages = [];
        state.selectedChatId = chatId;

        state.socket = await socket.connect({
          chatId,
          opened: () => {
            state.socket?.getMessages();
          },
          messages: (msg: Message[] | Message) => {
            state.messages = (isArr(msg) ? msg : [...state.messages, msg]) as Message[];
            state.load = false;
            dispatch.call(this, SCROLL_BOTTOM);
          },
        });
        break;
      }
    }
  } catch (error) {
    handleError.call(this, error);
  }
}

function handleError(err: ReasonResponse) {
  const {state} = this as Component<ChatPageState, {}>;
  state.error = err.reason ?? error.unknown;
}

export {dispatch};
