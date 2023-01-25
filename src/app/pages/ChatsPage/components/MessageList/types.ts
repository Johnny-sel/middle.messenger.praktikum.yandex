import {Message} from '@app/types';

export type MessageListState = {
  load: boolean;
  error: string;
  messages: Message[];
  data: {
    search_message: string;
    message: string;
  };
  event?: InputEvent;
};

export type MessageListProps = {
  load: boolean;
  messages: Message[];
  sendMessage: (message: string) => void;
  onChange: (event: InputEvent) => void;
  onSubmit: (event: SubmitEvent) => void;
};
