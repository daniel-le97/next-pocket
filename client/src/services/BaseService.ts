import { RecordService } from "pocketbase"
import { TypeOf } from "zod"
import { Collections } from "../../PocketBaseTypes/pocketbase-types"
import { pb } from "../../utils/pocketBase"

 export interface BaseService<T>{
  getById() : Promise<T>
  getAll() : Promise<T[]>
  delete() : Promise<T>
  update() : Promise<T>
  create() : Promise<T>
}

export class Base{
  pb: RecordService
  constructor(collection: keyof typeof  Collections){
    this.pb = pb.collection(Collections[collection])
  }
}
