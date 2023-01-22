import {Auth} from '../repositories/auth';
import {Chat} from '../repositories/chat';
import {IConnectFunction, IWebSoketChat} from '../types/websoket';

export class WebSocketChat implements IWebSoketChat {
  private static _instance: WebSocketChat;

  baseUrl = 'wss://ya-praktikum.tech/ws/chats';
  soket: WebSocket | null;
  interval: number | undefined;

  static get instance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new this();
    return this._instance;
  }

  private ping() {
    if (this.interval) this.clearInterval();

    this.interval = window.setInterval(() => {
      this.soket?.send(JSON.stringify({type: 'ping'}));
    }, 1000);
  }

  private getMessages() {
    this.soket?.send(JSON.stringify({content: '0', type: 'get old'}));
  }

  async connect({chatId, getMessages, opened, closed, failed}: IConnectFunction) {
    const isSocketOpen = this.soket?.readyState === 1;
    console.log('isSocketOpen:', isSocketOpen);

    if (isSocketOpen) {
      this.clearInterval();
      this.disconnect();
    }

    const data = await Chat.getToken(chatId);
    const user = await Auth.user();

    this.soket = new WebSocket(this.baseUrl + `/${user.id}/${chatId}/${data.token}`);

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
    clearInterval(this.interval);
    this.interval = undefined;
  }

  disconnect() {
    this.soket?.close();
    this.soket = null;
  }
}
