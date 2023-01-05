import { LoginPage, ProfilePage, RegisterPage, EditProfilePage, EditPasswordPage } from '@app/pages';
import { Router } from '@core/router';

(function initApp() {
  const routes = [
    { path: '/', comp: LoginPage },
    { path: '/registration', comp: RegisterPage },
    { path: '/profile', comp: ProfilePage },
    { path: '/profile/edit', comp: EditProfilePage },
    { path: '/password/edit', comp: EditPasswordPage },
  ];

  Router.init(routes);
  Router.render(document.getElementById('root'));
})();
