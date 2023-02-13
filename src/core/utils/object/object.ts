function deepCopy(obj: unknown): Record<string, unknown> {
  return JSON.parse(JSON.stringify(obj));
}

export {deepCopy};
