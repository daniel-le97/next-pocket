/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import type { Hash } from "crypto"

import type {  PBChannel } from "./Channel";

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
  username: string;
  created: Date;
  updated: Date;
  avatarUrl: string;
  currentChannel : PBChannel
 

  constructor(data: {
    email: string;
    username: string;
    avatarUrl: string;
    created: Date;
    updated: Date;
    channel: Channel
  }) {
    this.email = data.email!;
    this.username = data.username!;
    this.avatarUrl = data.avatarUrl!;
    this.currentChannel = data.channel
    this.created = data.created || new Date(); // use default value if created is undefined
    this.updated = data.updated || new Date(); // use default value if updated is undefined
  }
}
