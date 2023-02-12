import {api} from '..';
import {DeleteUserRequest, DeleteChatRequest, DeleteChatResponse} from '../types';
import {GetChatsRequest, GetChatsResponse, CreateChatsRequest} from '../types';
import {ChatIdResponse, GetChatTokenResponse, GetChatUserRequest} from '../types';
import {AddUserRequest, GetUserResponse} from '../types';

const Chat = {
  getChats: (body?: GetChatsRequest): Promise<GetChatsResponse[]> => {
    return api.get('/chats', body);
  },
  getChatUsers: (chatId: number, body?: GetChatUserRequest): Promise<GetUserResponse[]> => {
    return api.get(`/chats/${chatId}/users`, body);
  },
  createChat: (body?: CreateChatsRequest): Promise<ChatIdResponse> => {
    return api.post('/chats', body);
  },
  deleteChat: (body?: DeleteChatRequest): Promise<DeleteChatResponse> => {
    return api.delete('/chats', body);
  },
  getToken: (chatId?: number): Promise<GetChatTokenResponse> => {
    return api.post(`/chats/token/${chatId}`);
  },
  addUser: (body?: AddUserRequest): Promise<string> => {
    return api.put(`/chats/users`, body);
  },
  deleteUser: (body?: DeleteUserRequest): Promise<string> => {
    return api.delete(`/chats/users`, body);
  },
};

export {Chat};
