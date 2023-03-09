/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppState } from "../../AppState";
import type {
  ServersRecord,
  ServersResponse,
} from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import { Server } from "../../PocketBaseTypes/utils";
import { pb } from "../../utils/pocketBase";

class ServersService {
  async getServersList() {
    // get all servers available
    const res = await pb
      .collection(Collections.Servers)
      .getList<Server>(1, 50, {
        expand: "image,members",
      });

    // add the servers to the global state
    AppState.servers = res.items;
    // console.log(AppState.servers);
  }

  //TODO When Creating a Server must also create a Member Collection Record & a Default Channel Record for the Server, push them to the server.Id page .
  async createServer(serverData: ServersRecord) {
    // create a server with the provided data
    const newServer = await pb
      .collection(Collections.Servers)
      .create<ServersResponse>(serverData, {
        expand: "image",
      });

    // update the global servers state if the server is created successfully
    // if (newServer) {
    //   const data: ServerData = {
    //     server: newServer.id,
    //     user: newServer.owner!,
    //   };
    //   const userMemberRecord = await pb
    //     .collection(Collections.Members)
    //     .create(data, {
    //       expand: "server.image",
    //     });
    // const defaultServerChannel = await channelsService.createChannel(newServer.id);
    // AppState.servers = [...AppState.servers, newServer];
    // AppState.userServers = [...AppState.userServers,newServer]
    return newServer;
  }
}

export const serversService = new ServersService();
