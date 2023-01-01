export function findMatchBetWeen(str: string, start: string, end: string) {
  const result = str.match(new RegExp(start + "(.*)" + end));
  if (!result) return { match: undefined, innerValue: undefined };
  return { match: result[0], innerValue: result[1] };
}