export type TInput = {
  name: string;
  placeholder: string;
  pattern: string;
  type: string;
  error: string;
};

export type ActionPayload = {
  type: string;
  payload: unknown;
};
