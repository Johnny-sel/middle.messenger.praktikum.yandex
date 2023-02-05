import {api} from '..';
import {GetChatsRequest, GetChatsResponse, CreateChatsRequest, AddUserRequest} from '../types';
import {ChatIdResponse, GetChatTokenResponse, GetChatUserRequest} from '../types';

const Chat = {
  getChats: (body?: GetChatsRequest): Promise<GetChatsResponse[]> => {
    return api.get('/chats', body);
  },
  getChatUsers: (chatId: string, body?: GetChatUserRequest): Promise<GetChatsResponse[]> => {
    return api.get(`/chats/${chatId}/users`, body);
  },
  createChat: (body?: CreateChatsRequest): Promise<ChatIdResponse> => {
    return api.post('/chats', body);
  },
  getToken: (chatId?: number): Promise<GetChatTokenResponse> => {
    return api.post(`/chats/token/${chatId}`);
  },
  addUser: (body?: AddUserRequest): Promise<string> => {
    return api.post(`/chats/users/`, body);
  },
};

export {Chat};
