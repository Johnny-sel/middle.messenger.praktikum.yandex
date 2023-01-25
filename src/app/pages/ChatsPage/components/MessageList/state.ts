import {MessageListState} from './types';

export const messageListState: MessageListState = {
  load: false,
  error: '',
  messages: [],
  inputData: {
    search_message: '',
    message: '',
  },
};
