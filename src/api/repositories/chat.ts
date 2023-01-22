import {api} from '..';
import {GetChatsRequest, GetChatsResponse, CreateChatsRequest, ChatIdResponse} from '../types';
import {GetChatToken} from '../types/response/GetChatToken';

const Chat = {
  getChats: (body?: GetChatsRequest): Promise<GetChatsResponse[]> => {
    return api.get('/chats', body);
  },
  createChat: (body?: CreateChatsRequest): Promise<ChatIdResponse> => {
    return api.post('/chats', body);
  },
  getToken: (chatId?: string): Promise<GetChatToken> => {
    return api.post(`/chats/token/${chatId}`);
  },
};

export {Chat};
