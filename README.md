# Yandex practicum sprint_1

[UI prototype in figma](https://www.figma.com/file/nJe5jORwqJie23I0MasHvb/Yandex-practicum-messenger?node-id=0%3A1&t=LNudhR1BQmAkxQ6N-1)

### Running development (localhost:1234)

    npm install
    npm run dev

### Running production (localhost:3000)

    npm install
    npm run start

### Structure project

    --src
        --app               - application source
        --core              - custom framework
            -- component    - service of create component and manage state
            -- router       - service of manage navigation
            -- vdom         - service that create virtual dom
            -- utils        - utils for core and application

### Quick Start

```js
// index.js
(function initApp() {
  const routes = [
      { path: '/', component: MainPage },
      { path: '/login', component: LoginPage },
      { path: '/account, component: AccountPage },
   ];

  Router.init(routes);
  Router.render(document.getElementById('root'));
})();
```

```js
// MainPage.js
import { div, h1, span } from '@core/tags';
import { Component } from '@core/component';

export default class MainPage extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      div('c=main;', [
        h1('c=main__title title;', [ 'Main page title' ]),
        span('c=main__text text;', [ 'Main page text' ])
      ])
    )
  }
}
```

### How it works?
    1. div - function that return object (virtual node) like:
        {
            tag: 'main',
            chandlers: {},
            attrs: { class: 'main },
            children: [
                {
                    tag: 'h1',
                    handlers: {},
                    attrs: { class: 'main__title title' },
                    children: ['Main page title'],
                },
                {
                    handlers: {},
                    tag: 'span',
                    attrs: { class: 'main__text text' },
                    children: ['Main page text'],
                }
            ]
        }

    2. When Component will be initialize, it remember current snapshot of object, that method create() return.
    
    3. The Router determines the current url path and creates a DOM element based on the object that return method create().
    
    4. When Router will be created DOM element, it set DOM element into object (virtual node).

    5. As a result, the object will look like this:

        {
            tag: 'main',
            chandlers: {},
            attrs: { class: 'main },
            element: refDomElement,
            children: [
                {
                    tag: 'h1',
                    handlers: {},
                    attrs: { class: 'main__title title' },
                    children: ['Main page title'],
                    element: refDomElement,
                },
                {
                    handlers: {},
                    tag: 'span',
                    attrs: { class: 'main__text text' },
                    children: ['Main page text'],
                    element: refDomElement,
                }
            ]
        }
    
    6. When state will be changed. The div function return new object.

    7. Interception of Component catch this, and compares previos object (prev virtual node) with new object (next virtual node)

    8. Component will determine where the changes occurred and redraw only those elements in which there were changes.

### Examples
#### Component in component

```js
// Header.js
import { header } from '@core/tags';
import { Component } from '@core/component';

export default class Header extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      header('c=main;', [
        h1('c=main__title title;', [ 'Header title' ])
      ])
    )
  }
}
```

```js
// MainPage.js
import { component } from '@core/tags';
import { Component } from '@core/component';
import { Header } from '@app/components';

export default class Header extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      div('c=main;', [
        component(Header),
        span('c=main__text text;', [ 'Main page text' ])
      ])
    )
  }
}
```

#### Pass props to component

```js
// Header.js
import { header } from '@core/tags';
import { Component } from '@core/component';

export default class Header extends Component {
  constructor() {
    super();
  }

  create(state, props) {
    const { title } = props;
    // prettier-ignore
    return (
      header('c=main;', [
        h1('c=main__title title;', [ title ])
      ])
    )
  }
}
```

```js
// MainPage.js
import { component } from '@core/tags';
import { Component } from '@core/component';
import { Header } from '@app/components';

export default class MainPage extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      div('c=main;', [
        component(Header, { title: 'Header title' }),
        span('c=main__text text;', [ 'Main page text' ])
      ])
    )
  }
}
```

#### Use handlers

```js
// Button.js
import { button } from '@core/tags';
import { Component } from '@core/component';

export default class Button extends Component {
  constructor() {
    super();
  }

  onClick(event) {
    console.log('onClick');
  }

  create() {
    const onClick = this.onClick.bind(this);

    // prettier-ignore
    return (
      button('c=button;', ['Button name'], {click: onClick})
    )
  }
}
```

```js
// Input.js
import { input } from '@core/tags';
import { Component } from '@core/component';

export default class Input extends Component {
  constructor() {
    super();
  }

  onChange(event) {
    console.log('onChange');
  }

  create() {
    const onChange = this.onChange.bind(this);

    // prettier-ignore
    return (
      input('c=input;', ['Button name'], {change: onChange})
    )
  }
}
```

#### Create and change state

```js
// CustomComponent.js
import { button, span, div } from '@core/tags';
import { Component } from '@core/component';

export default class CustomComponent extends Component {
  constructor() {
    super();
  }

  createState() {
    return { text: '' };
  }

  onClick() {
    this.state.text = 'New text';
  }

  create(state) {
    const onClick = this.onClick.bind(this);

    // prettier-ignore
    return (
      div([
        span([ state.text ]),
        button('c=button;', ['Button name'], {click: onClick})
      ])
    )
  }
}
```

#### Navigation

```js
// CustomComponent.js
import { button, span, div } from '@core/tags';
import { Component } from '@core/component';
import { Router } from '@core/router';

export default class CustomComponent extends Component {
  constructor() {
    super();
  }

  goToLoginPage() {
    Router.to('/login');
  }

  create(state) {
    const goToLoginPage = this.goToLoginPage.bind(this);

    // prettier-ignore
    return (
      button('c=button;', ['Button name'], {click: goToLoginPage})
    )
  }
}
```

#### Life cycle component: didMount()

```js
// CustomComponent.js
import { span } from '@core/tags';
import { Component } from '@core/component';

export default class CustomComponent extends Component {
  constructor() {
    super();
  }

  didMount() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  create(state) {
    // prettier-ignore
    return (
      span(['Simple text'])
    )
  }
}
```

#### Layout

```js
// Layout.js
import { div, component } from '@core/tags';
import { Component } from '@core/component';
import { Header, Footer } from '@app/components';

export default class Layout extends Component {
  constructor() {
    super();
  }

  create(state, props) {
    const { children } = props;

    // prettier-ignore
    return (
      div('c=layout;', [
        component(Header),
        ...children.map(child => child),
        component(Footer)
      ])
    );
  }
}
```

```js
// LoginPage.js
import { component } from '@core/tags';
import { Component } from '@core/component';
import { LoginForm, Layout } from '@app/components';

export default class LoginPage extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      component(Layout, { children: [
        div('c=main;', [
            component(LoginForm)
        ])
      ]})
    )
  }
}
```

#### Dynamic styles

```js
// CustomComponent.js
import { span } from '@core/tags';
import { Component } from '@core/component';

export default class CustomComponent extends Component {
  constructor() {
    super();
  }

  createState() {
      return { isActive: false };
  }

  create(state) {
      const active = state.isActive ? 'active' : '';

    // prettier-ignore
    return (
      span(`c=text ${active};`, ['Simple text'])
    )
  }
}
```

#### Mapping

```js
// CustomComponent.js
import { span } from '@core/tags';
import { Component } from '@core/component';

export default class CustomComponent extends Component {
  constructor() {
    super();
  }

  create(state) {
    // prettier-ignore
    return (
      div([
          ...[1, 2, 3, 4, 5].map(item => span([ item ]))
      ])
    )
  }
}
```

### TODO
    1. To do comparison and replace children in virtual dom when state change
    2. To do Life cycle didUnmount()
    3. Fix parse attributes 
