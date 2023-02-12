import {ChatListState} from './types';

export const chatListState: ChatListState = {
  isClickChatMenu: false,
  showPopover: false,
  load: false,
  loadCreateChat: false,
  loadDeleteChat: false,
  error: '',
  selectedChatId: 0,
  deletedChatId: 0,
  inputData: {
    title: '',
    search_chat: '',
  },
  socket: undefined,
};
