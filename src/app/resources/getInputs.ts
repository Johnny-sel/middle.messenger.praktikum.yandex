import {name} from '@app/const';
import {inputs} from '@app/resources';

const {email, login, confirmPassword, displayName, firstName, password, phone, secondName} = name;

// login
const loginNames = [login, password];
const loginInputs = inputs.filter((input) => loginNames.includes(input.name));

// edit password
const editPassword = [password, confirmPassword];
const editPasswordInputs = inputs.filter((input) => editPassword.includes(input.name));

// edit profile
const editProfile = [email, login, firstName, secondName, displayName, phone];
const editProfileInputs = inputs.filter((input) => editProfile.includes(input.name));

// registration
const reg = [email, login, firstName, secondName, displayName, phone, password, confirmPassword];
const regInputs = inputs.filter((input) => reg.includes(input.name));

export {loginInputs, editPasswordInputs, editProfileInputs, regInputs};
