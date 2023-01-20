import {name, pattern, placeholder, error, type} from '@app/const';
import {Input} from '../types';

const inputs: Input[] = [
  {
    name: name.email,
    type: type.email,
    placeholder: placeholder.email,
    pattern: pattern.email,
    error: error.email,
  },

  {
    name: name.login,
    type: type.login,
    placeholder: placeholder.login,
    pattern: pattern.login,
    error: error.login,
  },

  {
    name: name.firstName,
    type: type.firstName,
    placeholder: placeholder.firstName,
    pattern: pattern.firstName,
    error: error.firstName,
  },

  {
    name: name.secondName,
    type: type.secondName,
    placeholder: placeholder.secondName,
    pattern: pattern.secondName,
    error: error.secondName,
  },

  {
    name: name.displayName,
    type: type.displayName,
    placeholder: placeholder.displayName,
    pattern: pattern.displayName,
    error: error.displayName,
  },

  {
    name: name.phone,
    type: type.phone,
    placeholder: placeholder.phone,
    pattern: pattern.phone,
    error: error.phone,
  },

  {
    name: name.password,
    type: type.password,
    placeholder: placeholder.password,
    pattern: pattern.password,
    error: error.password,
  },

  {
    name: name.confirmPassword,
    type: type.confirmPassword,
    placeholder: placeholder.confirmPassword,
    pattern: pattern.password,
    error: error.password,
  },

  {
    name: name.searchChat,
    type: type.searchChat,
    placeholder: placeholder.searchChat,
    pattern: pattern.searchChat,
    error: error.searchChat,
  },

  {
    name: name.searchMessage,
    type: type.searchMessage,
    placeholder: placeholder.searchMessage,
    pattern: pattern.searchMessage,
    error: error.searchMessage,
  },

  {
    name: name.sendMessage,
    type: type.sendMessage,
    placeholder: placeholder.sendMessage,
    pattern: pattern.sendMessage,
    error: error.sendMessage,
  },
  {
    name: name.newPassword,
    type: type.newPassword,
    placeholder: placeholder.newPassword,
    pattern: pattern.newPassword,
    error: error.newPassword,
  },

  {
    name: name.oldPassword,
    type: type.oldPassword,
    placeholder: placeholder.oldPassword,
    pattern: pattern.oldPassword,
    error: error.oldPassword,
  },
];

export {inputs};
