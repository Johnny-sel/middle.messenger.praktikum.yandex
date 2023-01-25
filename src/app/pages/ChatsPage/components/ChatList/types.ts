import {GetChatsResponse, IWebSocketChat} from '@api/types';

export type ChatListState = {
  showTooltip: boolean;
  load: boolean;
  error: string;
  selectedChatId: number;
  inputData: {
    title: string;
    search_chat: string;
  };
  event?: InputEvent;
  socket?: IWebSocketChat;
};

export type ChatListProps = {
  setWebSocketChat: (socket: IWebSocketChat, chatId: number) => void;
  chats: GetChatsResponse[];
};
