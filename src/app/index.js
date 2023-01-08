import { Router } from '@core/router';
import { location } from '@app/const';
import {
  LoginPage,
  ProfilePage,
  RegisterPage,
  EditProfilePage,
  EditPasswordPage,
  ErrorPage,
  ChatsPage,
} from '@app/pages';

function initApp() {
  const { root, error, chats, registration, profile, profileEdit, passwordEdit } = location;

  const routes = [
    { path: root, component: LoginPage },
    { path: error, component: ErrorPage },
    { path: chats, component: ChatsPage },
    { path: registration, component: RegisterPage },
    { path: profile, component: ProfilePage },
    { path: profileEdit, component: EditProfilePage },
    { path: passwordEdit, component: EditPasswordPage },
  ];

  Router.init(routes);
  Router.render(document.getElementById('root'));
}

initApp();
