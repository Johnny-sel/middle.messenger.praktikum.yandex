import {onChange} from '@app/functions';
import {Component} from '@core/component';
import {ReasonResponse} from '@api/types';
import {error} from '@app/constants';
import {ADD_USER_TO_CHAT, CHANGE_INPUT, SWITCH_TABS} from '@app/actions';

import {ChatListItemProps, ChatListItemState} from './types';
import {Chat, User} from '@api/repositories';

function handleError(err: ReasonResponse) {
  const {state} = this as Component<ChatListItemState, ChatListItemState>;

  if (err.reason === error.cookie) return;
  state.error = err.reason ?? error.auth;
}

async function dispatch(type: string, payload: unknown) {
  const {state, props} = this as Component<ChatListItemState, ChatListItemProps>;
  const login = (state.event?.target as HTMLInputElement)?.value;
  const chatId = props.chat.id;

  try {
    switch (type) {
      case CHANGE_INPUT: {
        onChange.call(this, state.event);
        state.allUser = await User.searchUser({login});
        break;
      }

      case SWITCH_TABS: {
        state.addUserTab = !state.addUserTab;
        state.deleteUserTab = !state.deleteUserTab;
        break;
      }

      case ADD_USER_TO_CHAT: {
        const userId = payload as number;
        state.loadAddUser = true;
        await Chat.addUser({chatId, users: [userId]});
        break;
      }
    }
  } catch (error) {
    // console.log('[error] ChatList reducer:', error);
    handleError.call(this, error);
  } finally {
    state.loadAddUser = false;
  }
}

export {dispatch};
