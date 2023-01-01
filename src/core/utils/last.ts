export const last = (list: any[]) => {
  if (list.length === 0) return undefined;
  return list[list.length - 1];
};

export const lastIndex = (list: any[]) => {
  if (list.length === 0) return undefined;
  return list.length - 1;
};
