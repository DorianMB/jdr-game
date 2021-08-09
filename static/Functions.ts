import {User} from "./models/user";

export function getNameAndEmail(user: User) {
    return user.name + " & " + user.mail;
  }
