import * as UserModel from "./models/user";

export function getNameAndEmail(user: any) {
    return user.Name + " & " + user.Mail;
  }
