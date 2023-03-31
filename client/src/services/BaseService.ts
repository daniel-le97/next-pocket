import { AppState } from "AppState";
import type { Admin, Record, RecordFullListQueryParams, RecordListQueryParams, RecordQueryParams, RecordService } from "pocketbase";
import { CollectionRecords, Collections } from "PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";

export interface IBaseService<T, P> {
  getById(id: string): Promise<T | void>;
  getAll(): Promise<T[]>;
  delete(id: string, secondaryId:string): Promise<T | void>;
  update(data: P): Promise<void>;
  create(data: string | P): Promise<T | void>;
}

export class BaseService {
  pb: RecordService;
  user: Record | Admin | null;
  constructor(collection: keyof typeof Collections) {
    this.pb = pb.collection(Collections[collection]);
    this.user = pb.authStore.model;
  }
}

export class BaseT<T> {
  pb: RecordService;

  collection: keyof typeof Collections;

  constructor(
    collection: keyof typeof Collections,
  ) {
    this.collection = collection;
    this.pb = pb.collection(Collections[collection]);


  }
  async _getAll(query: RecordFullListQueryParams): Promise<T[]> {
    const res = await this.pb.getFullList(query);
    const items = res as unknown as T[];
    return items;
  }
   async _getById(id: string, query?: RecordListQueryParams): Promise<T | void> {
    const res = await this.pb.getList(1, 1, { filter: `id = "${id}"`, ...query});
    const item = res.items[0] as unknown as T;
    return item;
  }
   async _delete(id: string): Promise<T | void> {
    await this.pb.delete(id);
  }
  async _getOne(id:string, query?: RecordQueryParams){
    return await this.pb.getOne(id, query)
  }

}

