import {GetChatsResponse} from '@api/types';

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
};
