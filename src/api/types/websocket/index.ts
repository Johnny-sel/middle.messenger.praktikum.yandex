export interface IWebSocketChat {
  connect: (args: IConnectFunction) => Promise<IWebSocketChat>;
  sendMessage: (message: string) => void;
}

export interface IConnectFunction {
  chatId: string;
  getMessages: Function;
  opened: Function;
  closed: Function;
  failed: Function;
}
