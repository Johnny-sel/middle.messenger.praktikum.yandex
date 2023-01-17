import {Auth} from './auth';

describe('API:', () => {
  describe('AUTH logout', () => {
    let res;
    test('should be return object', async () => {
      res = await Auth.logout();
      console.log('res:', res);
    });
  });
});
