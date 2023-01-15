Михаил добрый день! Мне наставник Николай сказал, что есть шанс вас переубедить. Поэтому воспользуюсь вторым пул реквестом и покажу тоже же, что и Николаю.

1. В первом спринте говорилось, что мы можем сделать свой шабланизатор и потом его поддерживать по ходу дела и им пользоваться. Но условий как этот шабланизтор будет реализован с вашей стороны (со стороны Яндекс курса) никаких не было. У меня шаблонизатор основывается на виртуальном доме (Virtual Dom). И реализован он был еще на первом спринте, так как надо было заранее побеспокоиться как у компонентов будут работать жизненые циклы, изменение состояния, прокидывания пропсов. Как все это работает я описывал в readme.

2. В чем собственно проблема? Получается, что та реализация которая сейчас у меня, идет в никуда. Так как вы сказали, что надо реализовать компоненту так, как это показано в теории. Придется все это переделывать с полного нуля. Зачем тогда нам надо было говорить, что мы можем реализовывать свой шаблонизатор и вводить в заблуждение. Правильно было бы тогда озвучить условия, например, что шаблонизатор на вирутальном доме не реализуйте, так как это не подойдет для дальнешейго продолжения курса. Либо озвучить, что от шаблонизатора нужен только рендер и дальше ничего не делайте, мол сделаете по ходу курса.    

3. Я еще раз приведу примеры из readme, что бы вы убедились в идеи реализации кастомного шаблонизатора([демонстрация](https://recordit.co/Anr1kKPe3R)). Вы увидите небольшую схожесть с React, только вместо jsx другая верстка. Если я вас не убедил, то мне придется переделывать все это под ту идею которая озвучена в теории ко второму спринту, которая по локаничности выглядит так себе. Если вас беспокоит утечка памяти, то ее нет, с ней спокойно справляется сборщик мусора, так как после изменения состояния, на ненужные объекты ссылок не остается.

**Создание и изменение состояния:**
```
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

**Использование жизненого цикла в компоненте**
```
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

**Динамические изменения стилей**
```
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

**Использование обработчиков**
```
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

**Мэпинг элементов**
```
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

Остальные примеры можете посмотреть в readme данной ветки. Отпишитесь пожалуйста к данному пул реквесту, как мне действовать дальше, оставлять ту реализацию которая есть и приступать к третьему спринту или делать как написано в теории по курсу. 