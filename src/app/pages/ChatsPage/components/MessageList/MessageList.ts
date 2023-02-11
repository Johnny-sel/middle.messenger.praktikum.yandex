import './MessageList.sass';

import {button, component, div, footer, h1, header, main, section, span} from '@core/tags';
import {Component} from '@core/component';
import {Input, Popover, Spinner} from '@app/components';
import {Router} from '@core/router';
import {location, name} from '@app/constants';
import {inputs} from '@app/resources';
import {MessageListProps, MessageListState} from './types';
import {Message} from '../index';
import {messageListState} from './state';
import {DELETE_USER_FROM_CHAT, SWITCH_TABS, CHANGE_INPUT} from '@app/actions';
import {ADD_USER_TO_CHAT, CLOSE_OPEN_ADD_USER_MENU} from '@app/actions';
import {dispatch} from './reducer';
import {GetUserResponse} from '@api/types';
import {debounce} from '@app/utils';

const sendMessageInput = inputs.find((e) => e.name === name.sendMessage);
const loginInput = inputs.find((input) => input.name === name.login);

export default class MessageList extends Component<MessageListState, MessageListProps> {
  constructor() {
    super();
  }

  createState() {
    return messageListState;
  }

  closeOpenPopover(e: Event) {
    e.stopPropagation();
    dispatch.call(this, CLOSE_OPEN_ADD_USER_MENU);
  }

  switchTabs(event?: Event) {
    event?.stopPropagation();
    dispatch.call(this, SWITCH_TABS);
  }

  onChangeLogin(event: InputEvent) {
    event.stopPropagation();
    this.state.event = event;
    debounce(dispatch.bind(this), 500)(CHANGE_INPUT);
  }

  addUserToChat(event: Event, userId: number) {
    event.stopPropagation();
    dispatch.call(this, ADD_USER_TO_CHAT, userId);
  }

  deleteUserFromChat(event: Event, userId: number) {
    event.stopPropagation();
    dispatch.call(this, DELETE_USER_FROM_CHAT, userId);
  }

  create() {
    const {messages: msgs, loadMessages, inputData} = this.props;
    const {onChange, onSubmit, selectedChatId, showPopover} = this.props;

    const {addUserTab, deleteUserTab, inputData: inputLogin} = this.state;
    const {loadAddUser, allUser, chatUsers, error} = this.state;

    const switchTabs = this.switchTabs.bind(this);
    const onChangeLogin = this.onChangeLogin.bind(this);
    const addUserToChat = this.addUserToChat.bind(this);
    const deleteUserFromChat = this.deleteUserFromChat.bind(this);
    const closeOpenPopover = this.closeOpenPopover.bind(this);

    const notSelectedChat = selectedChatId === 0;
    const haveNotMessages = msgs.length === 0;
    const center = haveNotMessages || notSelectedChat || loadMessages ? 'center' : '';

    const selectedAddUser = addUserTab ? '--active' : '';
    const selectedDeleteUser = deleteUserTab ? '--active' : '';

    const errorText = 'Something went wrong, we are already fixing. Try again please';
    const popoverCenter = error || loadAddUser ? '--center' : '';

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}') as GetUserResponse;

    // prettier-ignore
    const allUserList = allUser.map(user=>
      div('c=popover__userlist__user user_item;', [
        span('c=user_item__name;', [`${user.first_name} ${user.second_name}`  ]),
        chatUsers.find(u=> u.id === user.id) ?
          span('c=user_item__done;'):
          button('c=user_item__add button;',{click: (evt:Event)=> {addUserToChat(evt, user.id)}}),
      ],{click: (evt:Event)=> {evt.stopPropagation()}})
    );

    // prettier-ignore
    const chatUserList = chatUsers.map(user=>
      div('c=popover__userlist__user user_item;', [
        span('c=user_item__name;', [`${user.first_name} ${user.second_name}`  ]),
        currentUser.id == user.id ?
          span('c=user_item__delete button disabled;'):
          button('c=user_item__delete button;',{click: (evt:Event)=> {deleteUserFromChat(evt, user.id)}}),
      ],{click: (evt:Event)=> {evt.stopPropagation()}})
    )

    // prettier-ignore
    const messages = msgs.map((msg) => component.call(this, Message, {...msg, key: msg.id}));

    // prettier-ignore
    return (
      section('c=chats__messages;', [
        // top
        header('c=chats__messages__header;', [
          button(`c=chats__messages__header__add_user button; t=button; n=account;`,
            {click: closeOpenPopover},
          ),
          component.call(this, Popover, {
            key: '1',
            show: showPopover,
            className: 'popover__add_user',
            position: {top: '15px', left: '50px'},
            children: [
              div(`id=popover; c=chat__list__item__menu__popover;`, [
                div('c=popover__tabs;', [
                  button(`c=popover__tabs tab${selectedAddUser} button; n=Add user`,
                    ['Add user'],
                    {click: switchTabs}),
                  button(`c=popover__tabs tab${selectedDeleteUser} button; n=Delete user`,
                    ['Delete user'],
                    {click: switchTabs}),
                ]),
                div('c=popover__body;', [
                  div(`c=popover__userlist${popoverCenter};`,
                    selectedAddUser ?
                      loadAddUser ? [component.call(this, Spinner, {key: '3'})] :
                      [
                        div(`c=popover__userlist__body;`, [
                          component.call(this, Input, {
                            ...loginInput,
                            key: '2',
                            change: onChangeLogin,
                            value: inputLogin[name.login],
                            showError: false,
                          }),
                          div(`c=popover__userlist__body__users${popoverCenter};`,
                              error ? [span('c=popover__userlist__body_error error;', [errorText])]:
                                [...allUserList ]
                          ),
                        ])
                      ]:
                      loadAddUser ? [component.call(this, Spinner, {key: '3'})] : [...chatUserList ]
                  ),
                ]),
              ]),
            ],
          }),
          div('c=chats__messages__header__greet;', [
            h1('c=chats__messages__header__greet__title title;', ['Chat Messages']),
          ]),
          button('c=chats__messages__header__home button; t=button; n=home',
            {click: () => Router.to(location.root)},
          ),
        ]),
        // middle
        main(`c=chats__messages__message_items ${center}; id=messages`,
          notSelectedChat ? [span(`c=chats__messages__message_items__info;`, ['OPEN ANY CHAT'])]
            : loadMessages ? [component.call(this, Spinner,{key: '5'})]
                : haveNotMessages ? [span(`c=chats__messages__message_items__info;`, ['SEND MESSAGE'])]
                  : [...messages]
        ),
        // bottom
        footer('c=chats__messages__footer;', [
          component.call(this, Input, {
            ...sendMessageInput,
            change: onChange,
            keydown: (e: SubmitEvent) => {
              if ((e as Record<string, any>).key === 'Enter') {
                onSubmit(e);
              }
            },
            key: '6',
            value: inputData['message'],
            className: 'chats__messages__footer__message',
          }),
          button(`c=chats__messages__footer__send button; t=button; n=send message;`,
            {click: onSubmit}
          ),
        ]),
      ])
    );
  }
}
