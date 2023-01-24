import {GetChatsResponse, IWebSocketChat} from '@api/types';

export type ChatListState = {
  showTooltip: boolean;
  load: boolean;
  error: string;
  chats: GetChatsResponse[];
  data: {
    title: string;
    search_chat: string;
  };
  event?: InputEvent;
  socket?: IWebSocketChat;
};

export const chatListState: ChatListState = {
  showTooltip: false,
  load: false,
  chats: [],
  error: '',
  data: {
    title: '',
    search_chat: '',
  },
  socket: undefined,
};
