import { navigateTo } from "./services/navigator";
import { initNavigator } from "./services/navigator";
import { urlSeparator, home } from "./routes";
import { first } from "./utils";

(function init() {
  const href = initNavigator();
  const routs = href.split(urlSeparator);

  const isRoot = first(routs) === home;
  console.log("isRoot:", isRoot);

  // TODO if have not creds redirect to login;
  navigateTo("/");
})();
