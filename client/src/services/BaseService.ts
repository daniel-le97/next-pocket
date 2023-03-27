import { AppState } from "AppState";
import type { Admin, Record, RecordService } from "pocketbase";
import { Collections } from "PocketBaseTypes/pocketbase-types";
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
  user: Record | Admin | null;
  collection: keyof typeof Collections;
  state: T;
  constructor(
    collection: keyof typeof Collections,
    state: keyof typeof AppState
  ) {
    this.collection = collection;
    this.pb = pb.collection(Collections[collection]);
    this.user = pb.authStore.model;
    this.state = AppState[state] as unknown as T;
  }
 protected async _getAll(): Promise<T[]> {
    const res = await this.pb.getFullList();
    const items = res as unknown as T[];
    return items;
  }
  protected async _getById(id: string): Promise<T | void> {
    const res = await this.pb.getList(1, 1, { filter: `id = "${id}"` });
    const item = res.items[0] as unknown as T;
    return item;
  }
}

