export interface DeleteChatResponse {
  userId: number;
  result: Result;
}

export interface Result {
  id: number;
  title: string;
  avatar: string;
}
