import './MessageList.sass';

import {button, component, div, footer, header, main, section, span} from '@core/tags';
import {Component} from '@core/component';
import {Input, Popover, Spinner} from '@app/components';
import {Router} from '@core/router';
import {location, name} from '@app/constants';
import {inputs} from '@app/resources';
import {MessageListProps, MessageListState} from './types';
import {Message} from '../index';
import {messageListState} from './state';
import {ADD_USER_TO_CHAT, CHANGE_INPUT, CLOSE_OPEN_ADD_USER_MENU, SWITCH_TABS} from '@app/actions';
import {dispatch} from './reducer';

const searchMessageInput = inputs.find((e) => e.name === name.searchMessage);
const sendMessageInput = inputs.find((e) => e.name === name.sendMessage);
const loginInput = inputs.find((input) => input.name === name.login);

export default class MessageList extends Component<MessageListState, MessageListProps> {
  constructor() {
    super();
  }

  createState() {
    return messageListState;
  }

  openPopover() {
    dispatch.call(this, CLOSE_OPEN_ADD_USER_MENU);
  }

  switchTabs(event?: Event) {
    event?.stopPropagation();
    dispatch.call(this, SWITCH_TABS);
  }

  onChangeLogin(event: InputEvent) {
    event.stopPropagation();
    this.state.event = event;
    dispatch.call(this, CHANGE_INPUT);
  }

  addUserToChat(event: Event, userId: number) {
    event.stopPropagation();
    dispatch.call(this, ADD_USER_TO_CHAT, userId);
  }

  create() {
    const {messages: msgs, loadMessages, inputData} = this.props;
    const {onChange, onSubmit, selectedChatId} = this.props;

    const {showPopover, addUserTab, deleteUserTab} = this.state;
    const {loadAddUser, allUser, chatUsers, error, inputData: inputLogin} = this.state;

    const notSelectedChat = selectedChatId === 0;
    const haveNotMessages = msgs.length === 0;
    const center = haveNotMessages || notSelectedChat || loadMessages ? 'center' : '';
    const messages = msgs.map((msg) => component.call(this, Message, {...msg, key: msg.id}));

    const selectedAddUser = addUserTab ? '--active' : '';
    const selectedDeleteUser = deleteUserTab ? '--active' : '';

    const switchTabs = this.switchTabs.bind(this);
    const onChangeLogin = this.onChangeLogin.bind(this);
    const addUserToChat = this.addUserToChat.bind(this);
    const openPopover = this.openPopover.bind(this);

    const errorText = 'Something went wrong, we are already fixing. Try again please';
    const popoverCenter = error || loadAddUser ? 'center' : '';

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
      section('c=chats__messages;', [
        // top
        header('c=chats__messages__header;', [
          button('c=chats__messages__header__add_user button; t=button; n=account',
            {click: openPopover},
          ),
          component.call(this, Popover, {
            key: '1',
            show: showPopover,
            className: 'popover__add_user',
            position: {top: '15px', left: '50px'},
            children: [
              div(`c=chat__list__item__menu__popover;`, [
                div('c=popover__tabs;', [
                  button(`c=popover__tabs tab${selectedAddUser} button; n=Add user`,
                    ['Add user'],
                    {click: switchTabs}),
                  button(`c=popover__tabs tab${selectedDeleteUser} button; n=Delete user`,
                    ['Delete user'],
                    {click: switchTabs}),
                ]),
                // span('c=;', [selectedChatId]),
                div('c=popover__body;', [
                  div('c=popover__userlist;',
                      selectedAddUser ?
                        [
                          div('c=popover__userlist__body;', [
                            component.call(this, Input, {
                              ...loginInput,
                              key: '2',
                              change: onChangeLogin,
                              value: inputLogin[name.login],
                              showError: false,
                            }),
                            div(`c=popover__userlist__body__users--${popoverCenter};`,
                              loadAddUser? [component.call(this, Spinner, {key: '3'})] :
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
          component.call(this, Input, {
            ...searchMessageInput,
            change: onChange,
            key: '4',
            value: inputData['search_message'],
            className: 'chats__messages__header__search',
          }),
          button('c=chats__messages__header__account button; t=button; n=account',
            {click: () => Router.to(location.profile)},
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
          button(`c=chats__messages__footer__attach button; t=button; n=attach file;`,
            {click: onSubmit}
          ),
          component.call(this, Input, {
            ...sendMessageInput,
            change: onChange,
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
