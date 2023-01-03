import { LoginPage, LogoutPage } from '@pages';
import Router from '@core/router';

(function initApp() {
  const routes = [
    { path: '/', comp: LoginPage },
    { path: '/logout', comp: LogoutPage },
  ];

  Router._init(routes);
  Router.render(document.getElementById('root'));
})();
