import {onChange} from '@app/functions';
import {Component} from '@core/component';
import {ReasonResponse} from '@api/types';
import {error} from '@app/constants';
import {CHANGE_INPUT, CREATE_CHAT, OPEN_CHAT, SWITCH_TOOLTIP} from '@app/actions';
import {WebSocketChat} from '@api/websocket/chat';
import {ChatListProps, ChatListState} from './types';

function handleError(err: ReasonResponse) {
  const {state} = this as Component<ChatListState, ChatListProps>;

  if (err.reason === error.cookie) return;
  state.error = err.reason ?? error.auth;
}

async function dispatch(type: string, payload: unknown) {
  const {state, props} = this as Component<ChatListState, ChatListProps>;

  try {
    switch (type) {
      case CHANGE_INPUT: {
        onChange.call(this, state.event);
        break;
      }

      case SWITCH_TOOLTIP: {
        state.showTooltip = !state.showTooltip;
        break;
      }

      case CREATE_CHAT: {
        state.showTooltip = false;
        break;
      }

      case OPEN_CHAT: {
        const chatId = payload as number;
        state.selectedChatId = chatId;
        state.socket = WebSocketChat.instance;
        props.setWebSocketChat(state.socket, chatId); // pass to parent component
        break;
      }
    }
  } catch (error) {
    handleError.call(this, error);
  } finally {
    // state.load = false;
  }
}

export {dispatch};
