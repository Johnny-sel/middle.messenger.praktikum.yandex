import { name, pattern, placeholder, error } from '@app/const';
import { TInput } from './types';

const {
  confirmPassword,
  displayName,
  email,
  firstName,
  login,
  password,
  phone,
  secondName
} = name;

const registration = [
  email,
  login,
  firstName,
  secondName,
  displayName,
  phone,
  password,
  confirmPassword
];

const editProfile = [
  email,
  login,
  firstName,
  secondName,
  displayName,
  phone
];

const editPassowrd = [
  password,
  confirmPassword
];

const signin = [
  email,
  password,
];

const inputs: TInput[] = [
  {
    name: name.email,
    placeholder: placeholder.email,
    pattern: pattern.email,
    error: error.email
  },

  {
    name: name.login,
    placeholder: placeholder.login,
    pattern: pattern.login,
    error: error.login
  },

  {
    name: name.firstName,
    placeholder: placeholder.firstName,
    pattern: pattern.firstName,
    error: error.firstName
  },

  {
    name: name.secondName,
    placeholder: placeholder.secondName,
    pattern: pattern.secondName,
    error: error.secondName
  },

  {
    name: name.displayName,
    placeholder: placeholder.displayName,
    pattern: pattern.displayName,
    error: error.displayName
  },

  {
    name: name.phone,
    placeholder: placeholder.phone,
    pattern: pattern.phone,
    error: error.phone
  },

  {
    name: name.password,
    placeholder: placeholder.password,
    pattern: pattern.password,
    error: error.password
  },

  {
    name: name.confirmPassword,
    placeholder: placeholder.confirmPassword,
    pattern: pattern.password,
    error: error.password
  },
]

const regInputs = inputs.filter(input => registration.includes(input.name));
const loginInputs = inputs.filter(input => signin.includes(input.name));
const editProfileInputs = inputs.filter(input => editProfile.includes(input.name));
const editPassowrdInputs = inputs.filter(input => editPassowrd.includes(input.name));



export { regInputs, editProfileInputs, loginInputs, editPassowrdInputs }
