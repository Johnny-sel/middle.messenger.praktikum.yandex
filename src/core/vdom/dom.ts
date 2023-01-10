import { isStr, isNum } from '../utils';
import { VirtualNode } from '../types';

function createHTMLElement(vNode: VirtualNode | string | number): HTMLElement | Text {
  if (isStr(vNode) || isNum(vNode)) {
    return document.createTextNode(String(vNode));
  }

  const { tag, attrs, children, handlers } = vNode as VirtualNode;

  const domElement: HTMLElement = document.createElement(tag);
  const attributes = Object.entries(attrs);

  attributes.forEach(([key, value]) => {
    domElement.setAttribute(key, String(value));
  });

  Object.entries(handlers).forEach(([event, func]) => {
    domElement.addEventListener(event, func);
  });

  (vNode as VirtualNode).HTMLElement = domElement;

  children.forEach((child) => {
    domElement.appendChild(createHTMLElement(child));
  });

  return domElement;
}

export { createHTMLElement };
