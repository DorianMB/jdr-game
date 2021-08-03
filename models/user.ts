export class User {
  UserID?: number;
  Name?: string;
  Mail?: string;
  Password?: string;

  getNameAndEmail() {
    return this.Name  + ' & ' + this.Mail;
  }
}
