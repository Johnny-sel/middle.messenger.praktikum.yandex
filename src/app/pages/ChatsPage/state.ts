import {ChatPageState} from './types';

export const chatPageState: ChatPageState = {
  loadChats: false,
  loadMessages: false,
  messages: [],
  chats: [],
  selectedChatId: 0,
  error: '',
  socket: undefined,
  inputData: {
    search_message: '',
    message: '',
  },
};
