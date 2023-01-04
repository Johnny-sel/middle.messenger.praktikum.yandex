import { LoginPage, RegisterPage } from '@pages';
import { Router } from '@core/router';

(function initApp() {
  const routes = [
    { path: '/', comp: LoginPage },
    { path: '/registration', comp: RegisterPage },
  ];

  Router.init(routes);
  Router.render(document.getElementById('root'));
})();
