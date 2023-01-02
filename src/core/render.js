import { createElement } from './dom';

function render(Instance, root) {
  root.innerHTML = '';
  const vNodeInstance = new Instance();
  const vNode = vNodeInstance.create();

  if (vNode) {
    root.appendChild(createElement(vNode));
  }
}

export { render };
