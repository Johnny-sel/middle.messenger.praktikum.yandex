export const last = (list: any[]) => {
  if (list.length === 0) return undefined;
  return list[list.length - 1];
};
