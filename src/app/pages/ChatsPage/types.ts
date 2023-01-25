import {IWebSocketChat, GetChatsResponse} from '@api/types';
import {Message} from '@app/types';

export type ChatPageState = {
  load: boolean;
  error: string;
  messages: Message[];
  chats: GetChatsResponse[];
  selectedChatId: number;
  socket?: IWebSocketChat;
  inputData: {
    search_message: string;
    message: string;
  };
  event?: InputEvent;
};

export type ConnectWebSoketPayload = {
  socket: IWebSocketChat;
  chatId: number;
};
