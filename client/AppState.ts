/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { action, makeAutoObservable } from "mobx";
import { ChannelsRecord, MessagesRecord } from "./pocketbase-types";
import { isValidProp } from "./utils/isValidProp";

class ObservableAppState {
  user: Record<string, any> | null = null;
  /** @type {import('./src/models/Account.js').Account | null} */
  account: Record<string, any> | null = null;

  messageQuery: string = "";

  activeChannel: ChannelsRecord | null = null;

  channelTitles: (string | undefined)[] = [];
  channels: ChannelsRecord[] = [];
  messages: MessagesRecord[] = [];
  AppState: undefined;

  constructor() {
    makeAutoObservable(this);
    this.AppState = undefined;
    this.AppState = undefined;
  }
}

// eslint-disable-next-line no-undef
export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop);

    return target[prop];
  },
  set(target, prop, value) {
    isValidProp(target, prop);
    action(() => {
      target[prop] = value;
    })();
    return true;
  },
});
