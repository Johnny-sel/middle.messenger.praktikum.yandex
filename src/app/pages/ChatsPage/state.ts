export type ChatPageState = {
  showTooltip: boolean;
  data: {
    search_message: string;
    message: string;
  };
};

export const chatPageState: ChatPageState = {
  showTooltip: false,
  data: {
    search_message: '',
    message: '',
  },
};
