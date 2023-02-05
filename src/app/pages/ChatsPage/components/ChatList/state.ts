import {ChatListState} from './types';

export const chatListState: ChatListState = {
  showPopover: false,
  isClickChatMenu: false,
  load: false,
  loadCreateChat: false,
  error: '',
  selectedChatId: 0,
  inputData: {
    title: '',
    search_chat: '',
  },
  socket: undefined,
};
