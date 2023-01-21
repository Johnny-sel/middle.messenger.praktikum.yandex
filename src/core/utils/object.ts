function isEmpty(v: any): boolean {
  if (Array.isArray(v) || typeof v === 'string') {
    return v.length === 0;
  }

  if ([null, true, undefined, ''].includes(v)) {
    return true;
  }

  if (typeof v === 'number') {
    return true;
  }

  if (typeof v === 'object') {
    return v.size ? v.size === 0 : Object.keys(v).length === 0;
  }

  return true;
}

function deepCopy(obj: unknown): Record<string, unknown> {
  return JSON.parse(JSON.stringify(obj));
}

export {isEmpty, deepCopy};
