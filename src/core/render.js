import { createElement } from './element';

function render(vdom, root) {
  root.innerHTML = '';
  if (vdom) {
    regiseteringVirtualDom(vdom);
    root.appendChild(createElement(vdom));
  }
}

function regiseteringVirtualDom(vdom){
  window.vdom = vdom();
}

export { render };
