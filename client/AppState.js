/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { action, makeAutoObservable } from "mobx";
import { isValidProp } from "./utils/isValidProp";

class ObservableAppState {
  user = null;
  /** @type {import('./src/models/Account.js').Account | null} */
  account = null;

  test = "hi";

  messageQuery = "";
  /** @type {import('./src/models/Channel.js').Channel | null} */
  activeRoom = null; //general chat;
  activeChannel = null; //general chat;

  // /** @type {import('./src/models/Message.js').Message[]} */
  /**
   * @type {any[]}
   */
  messages = [];
  constructor() {
    makeAutoObservable(this);
  }
}

// eslint-disable-next-line no-undef
export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop);
    // @ts-ignore
    return target[prop];
  },
  set(target, prop, value) {
    isValidProp(target, prop);
    action(() => {
      // @ts-ignore
      target[prop] = value;
    })();
    return true;
  },
});
