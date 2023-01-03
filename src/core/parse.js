const events = ['click', 'move', 'blur']; // TODO single file

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

  const handlers = {};

  events.forEach((eventName) => {
    if (attsStr.includes(eventName)) {
      cutIndex = attsStr.indexOf(eventName) + (eventName.length + 1);
      attsStr = attsStr.slice(cutIndex);
      handlerName = attsStr.slice(0, attsStr.indexOf('('));
      handlers[eventName] = handlerName;
    }
  });

  return handlers;
}

export { parseAttrs, parseHandlers };
