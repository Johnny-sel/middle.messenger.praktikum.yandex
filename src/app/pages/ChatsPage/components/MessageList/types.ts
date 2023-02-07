import {GetUserResponse} from '@api/types';
import {InputData, Message} from '@app/types';

export type MessageListProps = {
  loadMessages: boolean;
  messages: Message[];
  selectedChatId: number;
  inputData: {
    search_message: string;
    message: string;
  };
  sendMessage: (message: string) => void;
  onChange: (event: InputEvent) => void;
  onSubmit: (event: SubmitEvent) => void;
};

export type MessageListState = {
  showPopover: boolean;
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
