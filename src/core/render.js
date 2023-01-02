import { createElement } from './element';

function render(vdom, root) {
  root.innerHTML = '';
  if (vdom) {
    root.appendChild(createElement(vdom));
  }
}



export { render };
