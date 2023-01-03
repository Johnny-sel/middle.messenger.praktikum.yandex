const handlers = ['onclick', 'onmove', 'onblur']; // TODO single file

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

function parseHandlers(attsStr) {
  let handlerName;
  let cutIndex;

  const handlerNames = [];

  handlers.forEach((handler) => {
    cutIndex = attsStr.indexOf(handler) + (handler.length + 1);
    attsStr = attsStr.slice(cutIndex);
    handlerName = attsStr.slice(0, attsStr.indexOf('('));
    handlerNames.push(handlerName);
  });

  return handlerNames;
}

export { parseAttrs, parseHandlers };
