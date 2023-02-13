import {IWebSocketChat, GetChatsResponse} from '@api/types';
import {Message} from '@app/types';

export type ChatPageState = {
  loadChats: boolean;
  loadMessages: boolean;
  showPopover: boolean;
  error: string;
  messages: Message[];
  chats: GetChatsResponse[];
  selectedChatId: number;
  socket?: IWebSocketChat;
  inputData: {
    search_message: string;
    message: string;
  };
  event?: InputEvent | MouseEvent;
};

export type ConnectWebSoketPayload = {
  socket: IWebSocketChat;
  chatId: number;
};
