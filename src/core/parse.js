function parseAttrs(attrsStr) {
  let attrs = {};
  
  attrsStr = attrsStr.replace('s=', ' style=');
  attrsStr = attrsStr.replace('c=', ' class=');
  attrsStr = attrsStr.replace('n=', ' name=');
  attrsStr = attrsStr.replace('p=', ' placeholder=');
  attrsStr = attrsStr.replace('t=', ' type=');
  attrsStr = attrsStr.replace('d=', ' disabled=');

  const attrsList = attrsStr.split(';');

  for (let i = 0; i < attrsList.length; i++) {
    const element = attrsList[i];
    if (element) {
      const key = element.split('=')[0].trim();
      const value = element.split('=')[1].trim();
      attrs[key] = value;
    }
  }

  return attrs;
}

export { parseAttrs };
