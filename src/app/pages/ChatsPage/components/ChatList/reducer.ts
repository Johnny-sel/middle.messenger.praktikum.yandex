import {onChange} from '@app/functions';
import {Component} from '@core/component';
import {ReasonResponse} from '@api/types';
import {error} from '@app/constants';
import {CHANGE_INPUT, CREATE_CHAT, DELETE_CHAT} from '@app/actions';
import {OPEN_CHAT, OPEN_FIRST_CHAT, SWITCH_TOOLTIP} from '@app/actions';
import {WebSocketChat} from '@api/sockets/chat';
import {ChatListProps, ChatListState} from './types';
import {Chat} from '@api/repositories';
import {first} from '@core/utils';

function handleError(err: ReasonResponse) {
  const {state} = this as Component<ChatListState, ChatListProps>;

  if (err.reason === error.cookie) return;
  state.error = err.reason ?? error.auth;
}

async function dispatch(type: string, payload: unknown) {
  const {state, props} = this as Component<ChatListState, ChatListProps>;
  const chatId = payload as number;

  try {
    switch (type) {
      case CHANGE_INPUT: {
        onChange.call(this, state.event);
        break;
      }

      case SWITCH_TOOLTIP: {
        state.showPopover = !state.showPopover;
        break;
      }

      case CREATE_CHAT: {
        state.loadCreateChat = true;
        await Chat.createChat({title: state.inputData['title']});
        await props.getChats();
        state.loadCreateChat = false;
        state.showPopover = false;
        break;
      }

      case DELETE_CHAT: {
        state.deletedChatId = chatId;
        state.loadDeleteChat = true;
        await Chat.deleteChat({chatId});
        await props.getChats();
        dispatch.call(this, OPEN_FIRST_CHAT);
        state.loadDeleteChat = false;
        break;
      }

      case OPEN_FIRST_CHAT: {
        const chat = first(props.chats);
        if (chat) {
          const chatId = chat.id;
          state.selectedChatId = chatId;
          state.socket = WebSocketChat.instance;
          props.setWebSocketChat(state.socket, chatId);
        }
        break;
      }

      case OPEN_CHAT: {
        if (state.selectedChatId === chatId) break;
        state.selectedChatId = chatId;
        state.socket = WebSocketChat.instance;
        props.setWebSocketChat(state.socket, chatId); // pass to parent component
        break;
      }
    }
  } catch (error) {
    handleError.call(this, error);
  } finally {
    state.load = false;
  }
}

export {dispatch};
