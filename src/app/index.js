import { Router } from '@core/router';
import {
  LoginPage,
  ProfilePage,
  RegisterPage,
  EditProfilePage,
  EditPasswordPage,
  ErrorPage,
  ChatsPage,
} from '@app/pages';

(function initApp() {
  const routes = [
    { path: '/', component: LoginPage },
    { path: '/error', component: ErrorPage },
    { path: '/registration', component: RegisterPage },
    { path: '/profile', component: ProfilePage },
    { path: '/profile/edit', component: EditProfilePage },
    { path: '/password/edit', component: EditPasswordPage },
    { path: '/chats', component: ChatsPage },
  ];

  Router.init(routes);
  Router.render(document.getElementById('root'));
})();
