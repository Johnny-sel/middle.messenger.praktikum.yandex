import { HomePage, LoginPage, LogoutPage } from "./pages";
import { RouterDOM } from "./libs/framework";

(function init() {
  const routes = [
    { path: "/", component: HomePage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
  ];

  const routerDom = new RouterDOM(document.querySelector("#root"), routes);

  routerDom.render();
})();
