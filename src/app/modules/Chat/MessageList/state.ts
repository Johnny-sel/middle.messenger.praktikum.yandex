import {GetChatsResponse, IWebSocketChat} from '@api/types';

export type MessageListState = {
  showTooltip: boolean;
  load: boolean;
  error: string;
  chats: GetChatsResponse[];
  data: {
    search_message: string;
    message: string;
  };
  event?: InputEvent;
  socket?: IWebSocketChat;
};


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
