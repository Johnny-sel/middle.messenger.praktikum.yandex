import { parseAttrs, parseHandlers } from '@core/parse';
import { isStr, isNum } from '@core/utils';

function createElement(vNode, vNodeInstance) {
  if (isStr(vNode) || isNum(vNode)) {
    return document.createTextNode(String(vNode));
  }

  const { tag, attrs, children } = vNode;

  const domElement = document.createElement(tag);
  const attributes = Object.entries(parseAttrs(attrs));
  const handlers = Object.entries(parseHandlers(attrs));

  vNode['element'] = domElement;

  attributes.forEach(([key, value]) => {
    domElement.setAttribute(key, value);
  });

  handlers.forEach(([event, handlerName]) => {
    const handler = vNodeInstance.__proto__[handlerName].bind(vNodeInstance);
    domElement.addEventListener(event, handler);
    domElement.removeAttribute(event, handlerName);
  });

  // TODO stack algoritm
  children.forEach((child) => {
    domElement.appendChild(createElement(child, vNodeInstance));
  });

  return domElement;
}

export { createElement };
