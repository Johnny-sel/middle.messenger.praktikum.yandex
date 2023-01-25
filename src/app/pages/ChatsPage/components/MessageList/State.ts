import {MessageListState} from './types';

export const messageListState: MessageListState = {
  load: false,
  error: '',
  messages: [],
  data: {
    search_message: '',
    message: '',
  },
};
