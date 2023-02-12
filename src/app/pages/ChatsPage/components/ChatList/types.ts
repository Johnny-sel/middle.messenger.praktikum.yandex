import {GetChatsResponse, IWebSocketChat} from '@api/types';

export type ChatListState = {
  showPopover: boolean;
  isClickChatMenu: boolean;
  load: boolean;
  error: string;
  loadCreateChat: boolean;
  loadDeleteChat: boolean;
  selectedChatId: number;
  deletedChatId: number;
  inputData: {
    title: string;
    search_chat: string;
  };
  event?: InputEvent;
  socket?: IWebSocketChat;
};

export type ChatListProps = {
  setWebSocketChat: (socket: IWebSocketChat, chatId: number) => void;
  getChats: () => Promise<void>;
  chats: GetChatsResponse[];
  loadChats: boolean;
  selectedChatId: number;
};
