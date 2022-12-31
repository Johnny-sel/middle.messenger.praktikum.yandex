import { HomePage, LoginPage, LogoutPage } from "@pages";
import { RouterDom, StoreProvider } from "@framework";

(function init() {
  const routes = [
    { path: "/", component: HomePage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
  ];

  const initialState = { user: 'test' };
  const DOMElement = document.querySelector("#root");

  const stateManagment = new StoreProvider(initialState);
  const routerDom = new RouterDom(DOMElement, routes, stateManagment);

  routerDom.render();
})();
