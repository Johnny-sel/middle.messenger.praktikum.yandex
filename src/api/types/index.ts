export type UserResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type SingupRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  confirm_password?: string;
  phone: string;
};

export type UpdateProfileRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type UpdatePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type SigninRequest = {
  login: string;
  password: string;
};

export type UserIdResponse = {
  id: string;
};

export type ReasonResponse = {
  reason: string;
};

export type GetChatsRequest = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type ChatsResponse = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: LastMessage;
};

export type LastMessage = {
  user: UserResponse;
  time: string;
  content: string;
};
