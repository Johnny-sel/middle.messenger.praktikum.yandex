import {Router} from './router';
import {Route} from '@core/types';
import {location} from '@app/constants';
import {ChatsPage, EditPasswordPage, EditProfilePage} from '../../app/pages';
import {LoginPage, ProfilePage, RegisterPage, TestPage} from '../../app/pages';

const routes: Route[] = [
  {path: '/test', component: TestPage},
  {path: 'failed', component: TestPage},
  {path: location.root, component: LoginPage},
  {path: location.chats, component: ChatsPage},
  {path: location.registration, component: RegisterPage},
  {path: location.profile, component: ProfilePage},
  {path: location.profileEdit, component: EditProfilePage},
  {path: location.passwordEdit, component: EditPasswordPage},
];

let router: Router;

describe('Router', () => {
  beforeEach(() => {
    router = Router.init(routes);
  });
  test('init', () => {
    expect(router['routes']).toEqual(routes);
  });
  test('render', () => {
    const htmlElement = document.createElement('div');
    const func = () => {
      Router.render(htmlElement);
    };

    expect(func).not.toThrow();
  });
  test('to', () => {
    const func = () => {
      Router.to('/');
    };

    expect(func).not.toThrow();
  });
  test('goBack', () => {
    const func = () => {
      Router.goBack();
    };

    expect(func).not.toThrow();
  });
  test('subscribe', () => {
    const func1 = () => {
      Router['instance']['subscribe']('popstate');
    };

    const func2 = () => {
      Router['instance']['index'] = 1;
      Router['instance']['listener'].call(router);
    };

    const func3 = () => {
      Router['instance']['index'] = 4;
      Router['instance']['listener'].call(router);
    };

    expect(func1).not.toThrow();
    expect(func2).not.toThrow();
    expect(func3).not.toThrow();
  });
  test('navigateTo', () => {
    const func1 = () => {
      Router['instance']['navigateTo'](location.profile);
    };

    const func2 = () => {
      Router['instance']['navigateTo']('/test', {clickButton: 'next'});
    };

    const func3 = () => {
      Router['instance']['navigateTo']('/test', {clickButton: 'prev'});
    };

    const func4 = () => {
      Router['instance']['navigateTo']('/failed');
    };

    const func5 = () => {
      Router['instance']['navigateTo']('failed');
    };

    expect(func1).not.toThrow();
    expect(func2).not.toThrow();
    expect(func3).not.toThrow();
    expect(func4).toThrowError(`[Router]: router '/error' is undefined`);
    expect(func5).toThrowError(`[Router]: router '/error' is undefined`);
  });
});
