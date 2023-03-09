import { ServersResponse } from "./pocketbase-types";

export type TServerExpand<T> = {
  server: ServersResponse<T>;
};
