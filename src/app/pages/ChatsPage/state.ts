import {ChatPageState} from './types';

export const chatPageState: ChatPageState = {
  load: false,
  messages: [],
  socket: undefined,
  data: {
    search_message: '',
    message: '',
  },
};
