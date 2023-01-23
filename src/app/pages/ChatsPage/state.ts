import {IWebSocketChat} from '@api/types';

export type ChatPageState = {
  load: boolean;
  messages: unknown[];
  socket?: IWebSocketChat;
};

export const chatPageState: ChatPageState = {
  load: false,
  messages: [],
  socket: undefined,
};
