/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export class Message {
  id: string;
  email: string;
  name: string;
  picture: string;
  constructor(data: Partial<Message>) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.picture = data.picture;
    // TODO add additional properties if needed
  }
}
