import { AppState } from "AppState"
import { Admin, Record, RecordService } from "pocketbase"
import { MessageWithUser } from "PocketBaseTypes/utils"
import { TypeOf } from "zod"
import { Collections, MessagesRecord } from "../../PocketBaseTypes/pocketbase-types"
import { pb } from "../../utils/pocketBase"
import { TestState } from "./Test"

export interface BaseService<T,P>{
  getById(id:string) : Promise<T> 
  getAll() : Promise<T[]>
  delete(id:string) : Promise<void>
  update(data: P) : Promise<T | void>
  create(data: string | P) : Promise<T | undefined>
}

export class Base{
  pb: RecordService
  user: Record | Admin | null
  constructor(collection: keyof typeof  Collections){
    this.pb = pb.collection(Collections[collection])
    this.user = pb.authStore.model
  }
}


export class BaseT<T, P> {
  pb: RecordService;
  user: Record | Admin | null;
  collection : keyof typeof Collections
  constructor(collection: keyof typeof Collections) {
    this.collection = collection
    this.pb = pb.collection(Collections[collection]);
    this.user = pb.authStore.model;
  }

  async getById(id: string): Promise<T> {
    const res = await this.pb.getList(1,1, {filter: `id = "${id}"`})
    return res.items[0] as unknown as T
  }
}

 class TestService extends BaseT<MessageWithUser, MessagesRecord>{
  constructor(){
    super("Messages")
  }
}




