import { Admin, Record, RecordService } from "pocketbase"
import { TypeOf } from "zod"
import { Collections } from "../../PocketBaseTypes/pocketbase-types"
import { pb } from "../../utils/pocketBase"

 export interface BaseService<T,P>{
  getById(id:string) : Promise<T> 
  getAll() : Promise<T[]>
  delete(id:string) : Promise<T>
  update(data: P) : Promise<void>
  create(data: P) : Promise<T>
}

export class Base{
  pb: RecordService
  user: Record | Admin |null
  constructor(collection: keyof typeof  Collections){
    this.pb = pb.collection(Collections[collection])
    this.user = pb.authStore.model
  }

}
