export interface User {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
}

export class UserModel {
  _id: any;
  UserId: string;
  Email: string;
  FirstName: string;
  LastName: string;
}
