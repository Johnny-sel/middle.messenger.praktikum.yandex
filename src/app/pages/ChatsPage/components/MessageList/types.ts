import {Message} from '@app/types';

export type MessageListProps = {
  load: boolean;
  messages: Message[];
  inputData: {
    search_message: string;
    message: string;
  };
  sendMessage: (message: string) => void;
  onChange: (event: InputEvent) => void;
  onSubmit: (event: SubmitEvent) => void;
};
