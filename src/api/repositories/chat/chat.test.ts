import {Auth} from '../auth/auth';
import {Chat} from './chat';

describe('API:', () => {
  describe('GET chats', () => {
    let res;
    test('should be return object', async () => {
      res = await Auth.signin({login: 'esseleznev', password: 'Perfect3492#'});
      console.log('res:', res);
      res = await Chat.getChats();
      console.log('res:', res);
    });
  });
});
