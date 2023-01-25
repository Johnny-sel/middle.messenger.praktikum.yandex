import {api} from '..';
import {
  GetChatsRequest,
  GetChatsResponse,
  CreateChatsRequest,
  ChatIdResponse,
  GetChatTokenResponse,
} from '../types';

const Chat = {
  getChats: (body?: GetChatsRequest): Promise<GetChatsResponse[]> => {
    return api.get('/chats', body);
  },
  createChat: (body?: CreateChatsRequest): Promise<ChatIdResponse> => {
    return api.post('/chats', body);
  },
  getToken: (chatId?: number): Promise<GetChatTokenResponse> => {
    return api.post(`/chats/token/${chatId}`);
  },
};

export {Chat};
