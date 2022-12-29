export const penultimate = list => {
  if (list.length === 0) return undefined;
  return list[list.length - 2];
};
