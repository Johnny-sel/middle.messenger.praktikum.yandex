import {Auth} from '../repositories/auth';
import {Chat} from '../repositories/chat';
import {IConnectFunction, IWebSoketChat} from '../types/websoket';

export class WebSocketChat implements IWebSoketChat {
  private static _instance: WebSocketChat;

  private baseUrl = 'wss://ya-praktikum.tech/ws/chats';
  private soket: WebSocket | null;
  private interval: number | null;

  static get instance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new this();
    return this._instance;
  }

  async connect({chatId, getMessages, opened, closed, failed}: IConnectFunction) {
    if (this.soket?.readyState === WebSocket.OPEN) {
      this.clearInterval();
      this.disconnect();
    }

    const data = await Chat.getToken(chatId);
    const user = await Auth.user();

    const WEB_SOKET_URL = this.baseUrl + `/${user.id}/${chatId}/${data.token}`;

    this.soket = new WebSocket(WEB_SOKET_URL);

    this.soket.addEventListener('message', (ev) => {
      getMessages(ev);
    });

    this.soket?.addEventListener('open', () => {
      this.ping();
      opened();
    });

    this.soket?.addEventListener('close', () => {
      closed();
    });

    this.soket?.addEventListener('error', () => {
      failed();
    });
  }

  clearInterval() {
    clearInterval(this.interval!);
    this.interval = null;
  }

  disconnect() {
    this.soket?.close();
    this.soket = null;
  }

  private ping() {
    if (this.interval) this.clearInterval();

    this.interval = window.setInterval(() => {
      this.soket?.send(JSON.stringify({type: 'ping'}));
    }, 10000);
  }
}
