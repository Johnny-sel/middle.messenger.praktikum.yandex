import {GetChatsResponse} from '@api/types';

export type ChatListItemProps = {
  chat: GetChatsResponse;
  active: boolean;
  onClick: (chatId: string) => void;
};
