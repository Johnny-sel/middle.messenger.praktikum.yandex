import {api} from '../..';
import {Reason, GetChats, Chats} from '../../types';

const Chat = {
  getChats: (body?: GetChats): Promise<Chats | Reason> => {
    return api.get('/chats', body);
  },
};

export {Chat};
