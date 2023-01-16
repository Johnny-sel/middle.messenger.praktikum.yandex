import {Attrs} from '../types';

function parseAttrs(attrsStr: string): Attrs {
  if (!attrsStr) return {};

  const attrs: Attrs = {};

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
    ['pt=', ' pattern='],
    ['req', ' required='],
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
      const match = element.match('=');
      if (match?.index) {
        const key = element.slice(0, match.index).trim();
        const value = element.slice(match.index + 1).trim();
        attrs[key] = value;
      }

      // const key = element.split('=')[0].trim();
      // const value = element.split('=')[1].trim();
      // attrs[key] = value;
    }
  });

  return attrs;
}

export {parseAttrs};
