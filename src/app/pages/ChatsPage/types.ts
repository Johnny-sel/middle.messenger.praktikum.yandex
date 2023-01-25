import {IWebSocketChat} from '@api/types';

export type ChatPageState = {
  load: boolean;
  messages: unknown[];
  socket?: IWebSocketChat;
  data: {
    search_message: string;
    message: string;
  };
  event?: InputEvent;
};
