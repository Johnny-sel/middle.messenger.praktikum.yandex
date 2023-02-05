import {Attrs} from '../../types';

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
    ['req=', ' required='],
  ];

  replacements.forEach((item) => {
    if (attrsStr.includes('alt')) {
      if (item[0] === 't=') return;
    }

    attrsStr = attrsStr.replace(item[0], item[1]).trim();
  });

  const attrsList: string[] = attrsStr.split(';');

  attrsList.forEach((attr: string) => {
    if (attr) {
      const match = attr.match('=');
      if (match?.index) {
        let key = attr.slice(0, match.index).trim();
        let value = attr.slice(match.index + 1).trim();

        if (key === 'style') {
          value = value.replace(/[\,]/g, ';');
        }

        attrs[key] = value;
      }
    }
  });

  return attrs;
}

export {parseAttrs};
