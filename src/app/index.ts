import {Router} from '@core/router';
import {location} from '@app/constants';

import {
  LoginPage,
  ProfilePage,
  RegisterPage,
  EditProfilePage,
  EditPasswordPage,
  ErrorPage,
  ChatsPage,
  TestPage,
} from '@app/pages';

function initApp() {
  const routes = [
    {path: '/test', component: TestPage},
    {path: location.root, component: LoginPage},
    {path: location.error, component: ErrorPage},
    {path: location.chats, component: ChatsPage},
    {path: location.registration, component: RegisterPage},
    {path: location.profile, component: ProfilePage},
    {path: location.profileEdit, component: EditProfilePage},
    {path: location.passwordEdit, component: EditPasswordPage},
  ];

  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('id #root is not exit in index.html');
  }

  Router.init(routes);
  Router.render(rootElement);
}

initApp();
