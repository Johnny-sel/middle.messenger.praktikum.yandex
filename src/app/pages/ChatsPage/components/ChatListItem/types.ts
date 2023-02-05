import {GetChatsResponse, GetUserResponse} from '@api/types';
import {InputData} from '@app/types';

export type ChatListItemState = {
  loadAddUser: boolean;
  statusAddUser: string;
  error: string;
  chatUsers: GetUserResponse[];
  allUser: GetUserResponse[];
  addUserTab: boolean;
  deleteUserTab: boolean;
  event?: InputEvent;
  inputData: InputData;
};

export type ChatListItemProps = {
  chat: GetChatsResponse;
  active: boolean;
  itemIndex: number;
  isClickChatMenu: boolean;
  onClickChat: (event: Event, chatId: number) => void;
  onClickChatMenu: (event: Event, chatId: number) => void;
};
