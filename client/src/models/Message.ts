/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export class Message {
 text: string
 user: string
  id: string
  created: Date
  updated: Date
  constructor(data: Partial<Message>) {
   this.text = data.text
   this.user = data.user
   this.id = data.id 
   this.created = data.created
   this.updated =  data.updated
    // TODO add additional properties if needed
  }
}
