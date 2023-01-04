function parseAttrs(attrsStr) {
  let attrs = {};

  replacements = [
    ['s=', ' style='],
    ['c=', ' class='],
    ['n=', ' name='],
    ['p=', ' placeholder='],
    ['t=', ' type='],
    ['di=', ' disabled='],
    ['f=', ' for='],
    ['v=', ' value='],
  ];

  replacements.forEach((item) => {
    attrsStr = attrsStr.replace(item[0], item[1]);
  });

  const attrsList = attrsStr.split(';');

  attrsList.forEach((element) => {
    if (element) {
      const key = element.split('=')[0].trim();
      const value = element.split('=')[1].trim();
      attrs[key] = value;
    }
  });

  return attrs;
}

export { parseAttrs };
