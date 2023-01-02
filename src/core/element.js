import { parseAttrs } from '@core/parse';
import { isStr, isFunc, isNum } from '@core/utils';

function createElement(component) {
  if (isStr(component) || isNum(component)) {
    return document.createTextNode(component.toString());
  }

  const { tag, attrs, children } = isFunc(component) ? component() : component;

  const domElement = document.createElement(tag);
  const attributes = Object.entries(parseAttrs(attrs));

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
