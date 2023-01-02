function parseAttrs(attrsString) {
  let attrs = {};
  attrsString = attrsString.replace('k=', ' key=');
  attrsString = attrsString.replace('s=', ' style=');
  attrsString = attrsString.replace('c=', ' class=');
  attrsString = attrsString.replace('n=', ' name=');
  attrsString = attrsString.replace('p=', ' placeholder=');
  attrsString = attrsString.replace('t=', ' type=');
  attrsString = attrsString.replace('d=', ' disabled=');

  const attrsList = attrsString.split(';');

  for (let i = 0; i < attrsList.length; i++) {
    const element = attrsList[i];
    if (element) {
      const key = element.split('=')[0].trim();
      const value = element.split('=')[1].trim();
      attrs[key] = value;
    }
  }

  console.log('attrs:', attrs)
  return attrs;
}

export { parseAttrs };
