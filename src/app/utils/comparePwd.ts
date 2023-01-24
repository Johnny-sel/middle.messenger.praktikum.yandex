import { name } from "@app/constants";

function comparePasswords(data: any): boolean {
  return data[name.confirmPassword] === data[name.password];
}

export {comparePasswords};
