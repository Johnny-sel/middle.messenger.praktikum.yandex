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

export type MessageListProps = {
  messages: unknown[];
  sendMessage: (message: string) => void;
};
