export interface IWebSocketChat {
  connect: (args: IConnectFunction) => Promise<IWebSocketChat>;
  sendMessage: (message: string) => void;
  getMessages: () => void;
}

export interface IConnectFunction {
  chatId: number;
  messages: Function;
  opened: Function;
  closed?: Function;
  failed?: Function;
}
