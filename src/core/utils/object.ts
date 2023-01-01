export function valueObjectFromString(str: string, obj: Object) {
  let result: any;
  let stringValues = str.split('#');

  return obj[stringValues[2]];

  for (let i = 2; i < stringValues.length; i++) {
    const prop = stringValues[i].trim();
    if (i == 1) {
      result = obj[prop];
      continue;
    }
    result = result[prop];
  }

  return result;
}