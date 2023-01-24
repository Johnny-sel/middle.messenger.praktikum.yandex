import {MessageListState} from './Types';

export const messageListState: MessageListState = {
  showTooltip: false,
  load: false,
  chats: [],
  error: '',
  data: {
    search_message: '',
    message: '',
  },
  socket: undefined,
};
