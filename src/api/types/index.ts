export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type Singup = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  confirm_password?: string;
  phone: string;
};

export type Signin = {
  login: string;
  password: string;
};

export type UserId = {
  id: string;
};

export type Reason = {
  reason: string;
};

export type GetChats = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type Chats = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: LastMessage;
};

export type LastMessage = {
  user: User;
  time: string;
  content: string;
};
