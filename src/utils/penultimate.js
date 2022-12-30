export const penultimate = list => {
  if (list.length === 0 || list.length < 2) return undefined;
  return list[list.length - 2];
};
