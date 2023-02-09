import {onChange} from '@app/functions';
import {Component} from '@core/component';
import {ReasonResponse} from '@api/types';
import {error} from '@app/constants';
import {CHANGE_INPUT, CREATE_CHAT, OPEN_CHAT, SWITCH_TOOLTIP} from '@app/actions';
import {WebSocketChat} from '@api/websocket/chat';
import {ChatListProps, ChatListState} from './types';
import {Chat} from '@api/repositories';

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
