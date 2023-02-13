import {Message} from '@app/types';

export interface IWebSocketChat {
  connect: (args: IConnectFunction) => Promise<IWebSocketChat>;
  sendMessage: (message: string) => void;
  getMessages: () => void;
}

export interface IConnectFunction {
  chatId: number;
  messages: (msg: Message[] | Message) => void;
  opened: () => void;
  closed?: () => void;
  failed?: () => void;
}
