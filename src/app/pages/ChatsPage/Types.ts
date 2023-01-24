import {IWebSocketChat} from '@api/types';

export type ChatPageState = {
  load: boolean;
  messages: unknown[];
  socket?: IWebSocketChat;
};
