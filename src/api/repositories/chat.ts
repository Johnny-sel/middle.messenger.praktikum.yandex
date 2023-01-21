import {api} from '..';
import {GetChatsRequest, ChatsResponse} from '../types';

const Chat = {
  getChats: (body?: GetChatsRequest): Promise<ChatsResponse> => {
    return api.get('/chats', body);
  },
};

export {Chat};
