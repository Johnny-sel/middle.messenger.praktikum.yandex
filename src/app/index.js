import { LoginPage, ProfilePage, RegisterPage } from '@app/pages';
import { Router } from '@core/router';

(function initApp() {
  const routes = [
    { path: '/', comp: LoginPage },
    { path: '/registration', comp: RegisterPage },
    { path: '/profile', comp: ProfilePage },
  ];

  Router.init(routes);
  Router.render(document.getElementById('root'));
})();
