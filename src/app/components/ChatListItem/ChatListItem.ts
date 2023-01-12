import './ChatListItem.sass';

import { div, li, span } from '@core/tags';
import { Component } from '@core/component';

export default class ChatListItem extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      li('c=chat__list__items__item; tabIndex=0;', [
        div('c=chat__list__items__item__avatar;', ['E']),
        div('c=chat__list__items__item__body;', [
          div('c=chat__list__items__item__body__top;', [
            span('c=chat__list__items__item__body__top__username;', ['Evgenii']),
            span('c=chat__list__items__item__body__top__time;', ['3:35 PM']),
          ]),
          div('c=chat__list__items__item__body__bottom;', [
            span('c=chat__list__items__item__body__bottom__text;', ['Message text']),
          ]),
        ]),
      ])
    );
  }
}