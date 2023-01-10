import { Attrs } from "../types";

function parseAttrs(attrsStr: string): Attrs {
  if (!attrsStr) return {};

  let attrs: Attrs = {};

  const replacements: string[][] = [
    ['s=', ' style='],
    ['c=', ' class='],
    ['n=', ' name='],
    ['p=', ' placeholder='],
    ['t=', ' type='],
    ['di=', ' disabled='],
    ['f=', ' for='],
    ['v=', ' value='],
    ['h=', ' href='],
    ['a=', ' action='],
  ];

  replacements.forEach((item) => {
    if (attrsStr.includes('alt')) {
      if (item[0] === 't=') return;
    }
    attrsStr = attrsStr.replace(item[0], item[1]);
  });

  const attrsList: string[] = attrsStr.split(';');

  attrsList.forEach((element: string) => {
    if (element) {
      const key = element.split('=')[0].trim();
      const value = element.split('=')[1].trim();
      attrs[key] = value;
    }
  });

  return attrs;
}

export { parseAttrs };
