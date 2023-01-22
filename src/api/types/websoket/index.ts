export interface IWebSoketChat {
  connect: (args: IConnectFunction) => Promise<void>;
}

export interface IConnectFunction {
  chatId: string;
  getMessages: Function;
  opened: Function;
  closed: Function;
  failed: Function;
}
