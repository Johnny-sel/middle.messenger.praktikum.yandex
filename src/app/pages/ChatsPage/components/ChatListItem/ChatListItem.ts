import {button} from './../../../../../core/vdom/tags/tags';
import './ChatListItem.sass';

import {div, li, span, component} from '@core/tags';
import {Component} from '@core/component';

import {parseDate} from '@app/utils';
import {ChatListItemProps, ChatListItemState} from './types';
import {Input, Popover, Spinner} from '@app/components';
import {dispatch} from './reducer';
import {ADD_USER_TO_CHAT, CHANGE_INPUT, SWITCH_TABS} from '@app/actions';
import {inputs} from '@app/resources';
import {name} from '@app/constants';

const loginInput = inputs.find((input) => input.name === name.login);

export default class ChatListItem extends Component<ChatListItemState, ChatListItemProps> {
  constructor() {
    super();
  }

  createState() {
    return {
      loadAddUser: false,
      statusAddUser: '',
      error: '',
      allUser: [],
      chatUsers: [],
      addUserTab: true,
      deleteUserTab: false,
      inputData: {[name.login]: ''},
    } as ChatListItemState;
  }

  switchTabs(event?: Event) {
    event?.stopPropagation();
    dispatch.call(this, SWITCH_TABS);
  }

  onChange(event: InputEvent) {
    event.stopPropagation();
    this.state.event = event;
    dispatch.call(this, CHANGE_INPUT);
  }

  addUserToChat(event: Event, userId: number) {
    event.stopPropagation();
    dispatch.call(this, ADD_USER_TO_CHAT, userId);
  }

  create() {
    const {active, chat, itemIndex, isClickChatMenu, onClickChat, onClickChatMenu} = this.props;
    const {chatUsers, addUserTab, deleteUserTab, error} = this.state;
    const {loadAddUser, inputData, allUser} = this.state;

    const time = parseDate(chat.last_message?.time).time;
    const content = chat.last_message?.content;

    const selectedChat = active ? '--active' : '';
    const selectedAddUser = addUserTab ? '--active' : '';
    const selectedDeleteUser = deleteUserTab ? '--active' : '';

    const lastMessage = content?.length > 20 ? content?.slice(0, 20) + '...' : content;

    const switchTabs = this.switchTabs.bind(this);
    const onChange = this.onChange.bind(this);
    const addUserToChat = this.addUserToChat.bind(this);

    const top = itemIndex >= 5 ? 'auto' : '20px';
    const bottom = itemIndex < 5 ? 'auto' : '0px';
    const center = error || loadAddUser ? 'center' : '';

    const errorText = 'Something went wrong, we are already fixing. Try again please';

    // prettier-ignore
    const allUserList = allUser.map(user=>
      div('c=popover__userlist__user user_item;', [
        span('c=user_item__name;', [`${user.first_name} ${user.second_name}`  ]),
        button('c=user_item__add button;',{click: (evt:Event)=> {addUserToChat(evt, user.id)}}
        ),
      ],{click: (evt:Event)=> {evt.stopPropagation()}})
    );

    // prettier-ignore
    const chatUserList = chatUsers.map((user) =>
      div('c=popover__userlist__user user_item;', [
        span('c=user_item__name;', [user.display_name]),
        button('c=user_item__add button;', {click: (evt: Event) => {addUserToChat(evt, user.id)}}),
      ], {click: (evt: Event) => {evt.stopPropagation()}})
    );

    // prettier-ignore
    return (
      li(`c=chat__list__item chat__list__item${selectedChat}; tabIndex=0;`, [
        button(`c=chat__list__item__menu button;`, {
          click: (event:Event) => {onClickChatMenu(event, chat.id)}
        }),
        component.call(this, Popover, {
          key: chat.id,
          show:  isClickChatMenu && selectedChat ,
          position: {top, bottom, left: '50px'},
          children: [
            div(`c=chat__list__item__menu__popover popover;`, [
              div('c=popover__tabs;', [
                div(`c=popover__tabs tab${selectedAddUser};`, [
                  span('c=tab__text;', ['Add user']),
                ], {click: switchTabs}),
                div(`c=popover__tabs tab${selectedDeleteUser};`, [
                  span('c=tab__text;', ['Delete user']),
                ], {click: switchTabs}),
              ]),
              span('c=;', [chat.id]),
              div('c=popover__body;', [
                div('c=popover__userlist;',
                    selectedAddUser ?
                      [
                        div('c=popover__userlist__body;', [
                          component.call(this, Input, {
                            ...loginInput,
                            key: '2',
                            change: onChange,
                            value: inputData[name.login],
                            showError: false,
                          }),
                          div(`c=popover__userlist__body__users--${center};`,
                            loadAddUser? [component.call(this, Spinner, {key: '1'})] :
                              error ? [span('c=popover__userlist__body_error error;', [errorText])]:
                                [...allUserList ]
                          ),
                        ])
                      ]: [...chatUserList ]
                ),
              ]),
            ]),
          ],
        }),
        div('c=chat__list__item__separator;'),
        div('c=chat__list__item__avatar;', ['E']),
        div('c=chat__list__item__body;', [
          div('c=chat__list__item__body__top;', [
            span('c=chat__list__item__body__top__username;',
              [chat.last_message?.user?.login ?? '']
            ),
            span('c=chat__list__item__body__top__time;',
              [time ?? '']
            ),
          ]),
          div('c=chat__list__item__body__bottom;', [
            span('c=chat__list__item__body__bottom__text;',
            [lastMessage ? lastMessage : chat.title]),
          ]),
        ]),
      ], {click: (event:Event) => {onClickChat(event, chat.id)}})
    );
  }
}
