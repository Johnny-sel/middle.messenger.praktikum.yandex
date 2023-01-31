export type TInput = {
  name: string;
  placeholder: string;
  pattern: string;
  type: string;
  error: string;
};

export type Message = {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: string;
  content: string;
  is_read: boolean;
  file: null;
};
