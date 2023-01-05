import { Router } from '@core/router';
import {
  LoginPage,
  ProfilePage,
  RegisterPage,
  EditProfilePage,
  EditPasswordPage,
  ErrorPage404,
  ErrorPage500,
} from '@app/pages';

(function initApp() {
  const routes = [
    { path: '/', component: LoginPage },
    { path: '/error-404', component: ErrorPage404 },
    { path: '/error-500', component: ErrorPage500 },
    { path: '/registration', component: RegisterPage },
    { path: '/profile', component: ProfilePage },
    { path: '/profile/edit', component: EditProfilePage },
    { path: '/password/edit', component: EditPasswordPage },
  ];

  Router.init(routes);
  Router.render(document.getElementById('root'));
})();
