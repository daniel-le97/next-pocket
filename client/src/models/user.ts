/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import type { Hash } from "crypto"

export class UserLogin {
  email: string;
  password: string;
  passwordConfirm: string;
  constructor(data: {
    email: string;
    password: string;
    passwordConfirm: string;
  }) {
    this.email = data.email;
    this.password = data.password;
    this.passwordConfirm = data.passwordConfirm;
  }
}

export class PBUser {
  email: string;
  username: String;
  created: Date;
  updated: Date;
  avatarUrl: String;
  user: any;

  constructor(data: {
    email: string;
    username: String;
    avatarUrl: String;
    created: Date;
    updated: Date;
  }) {
    this.email = data.email!;
    this.username = data.username!;
    this.avatarUrl = data.avatarUrl!;
    this.created = data.created || new Date(); // use default value if created is undefined
    this.updated = data.updated || new Date(); // use default value if updated is undefined
  }
}
