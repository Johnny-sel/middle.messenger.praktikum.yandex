import { parseAttrs } from '@core/parse';
import { isStr, isNum } from '@core/utils';

function createElement(vNode) {
  if (isStr(vNode) || isNum(vNode)) {
    return document.createTextNode(String(vNode));
  }

  const { tag, attrs, children } = vNode;

  const domElement = document.createElement(tag);
  const attributes = Object.entries(parseAttrs(attrs));

  vNode['element'] = domElement;

  attributes.forEach(([key, value]) => {
    domElement.setAttribute(key, value);
  });

  // TODO stack algoritm
  children.forEach((child) => {
    domElement.appendChild(createElement(child));
  });

  return domElement;
}

export { createElement };
