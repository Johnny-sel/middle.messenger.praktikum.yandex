import { name } from "@app/const";

function comparePasswords(data: any): boolean {
  return data[name.confirmPassword] === data[name.password];
}

export {comparePasswords};
