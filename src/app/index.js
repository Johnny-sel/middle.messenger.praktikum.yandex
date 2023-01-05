import { LoginPage, ProfilePage, RegisterPage, ProfilePageEdit } from '@app/pages';
import { Router } from '@core/router';

(function initApp() {
  const routes = [
    { path: '/', comp: LoginPage },
    { path: '/registration', comp: RegisterPage },
    { path: '/profile', comp: ProfilePage },
    { path: '/profile/edit', comp: ProfilePageEdit },
  ];

  Router.init(routes);
  Router.render(document.getElementById('root'));
})();
