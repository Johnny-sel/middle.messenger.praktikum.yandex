import {
  LoginPage,
  ProfilePage,
  RegisterPage,
  EditProfilePage,
  EditPasswordPage,
  ErrorPage404,
  ErrorPage500,
} from '@app/pages';
import { Router } from '@core/router';

(function initApp() {
  const routes = [
    { path: '/', comp: LoginPage },
    { path: '/error-404', comp: ErrorPage404 },
    { path: '/error-500', comp: ErrorPage500 },
    { path: '/registration', comp: RegisterPage },
    { path: '/profile', comp: ProfilePage },
    { path: '/profile/edit', comp: EditProfilePage },
    { path: '/password/edit', comp: EditPasswordPage },
  ];

  Router.init(routes);
  Router.render(document.getElementById('root'));
})();
