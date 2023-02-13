export interface GetChatsResponse {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: LastMessage;
}

export interface LastMessage {
  user: User;
  time: string;
  content: string;
}

export interface User {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
}

export type ChatIdResponse = {
  id: string;
};
