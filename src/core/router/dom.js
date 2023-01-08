import { isStr, isNum } from '../utils';

function createRootNode(vNode) {
  if (isStr(vNode) || isNum(vNode)) {
    return document.createTextNode(String(vNode));
  }

  const { tag, attrs, children, handlers } = vNode;

  const domElement = document.createElement(tag);
  const attributes = Object.entries(attrs);

  vNode['element'] = domElement;

  attributes.forEach(([key, value]) => {
    domElement.setAttribute(key, value);
  });

  Object.entries(handlers).forEach(([event, func]) => {
    domElement.addEventListener(event, func);
  });

  children.forEach((child) => {
    domElement.appendChild(createRootNode(child));
  });

  return domElement;
}

export { createRootNode };
