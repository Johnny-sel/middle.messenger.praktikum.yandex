import {api} from '../..';
import {ReasonResponse, GetChatsRequest, ChatsResponse} from '../../types';

const Chat = {
  getChats: (body?: GetChatsRequest): Promise<ChatsResponse | ReasonResponse> => {
    return api.get('/chats', body);
  },
};

export {Chat};
