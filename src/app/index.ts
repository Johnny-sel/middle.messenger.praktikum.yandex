import { HomePage, LoginPage, LogoutPage } from "@pages";
import { RouterDom } from "@framework";

(function init() {
  const routes = [
    { path: "/", component: HomePage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
  ];

  const root = document.querySelector("#root");
  const routerDom = new RouterDom(root, routes);

  routerDom.render();
})();
