/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import type { Hash } from "crypto"

export class UserLogin{
  email: string
  password: string 
  passwordConfirm: string
  constructor(data){
    this.email = data.email
    this.password = data.password
    this.passwordConfirm = data.passwordConfirm
  }
}