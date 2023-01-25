import { name } from "@app/constants";

function comparePasswords(inputData any): boolean {
  return inputData[name.confirmPassword] === inputData[name.password];
}

export {comparePasswords};
