/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppState } from "../../AppState";
import type {
  ServersRecord,
  ServersResponse,
} from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import type { Server, MemberUser } from "../../PocketBaseTypes/utils";
import { pb } from "../../utils/pocketBase";
import { uploadService } from "./UploadsService";

class ServersService {
  async getById(id: string) {
    const server = await pb
      .collection(Collections.Servers)
      .getFirstListItem<Server>(`id="${id}"`, {
        expand: "server.image",
      });
    console.log("server.getById", server);

    AppState.activeServer = server;
    return server;
  }
  async getServersList(page: number, ) {
    // get all servers available
    const res = await pb
      .collection(Collections.Servers)
      .getList<Server>(page, 9, {
        expand: "image,members",
        sort: `created`,
        filter: 'private=false'
      });

    // add the servers to the global state
    AppState.servers = res.items;
    // console.log("servers", res.items);
    AppState.page = res.page;
    AppState.totalPages = res.totalPages;
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

    AppState.userServers = [...AppState.userServers, newServer];
    AppState.servers = [...AppState.servers, newServer];
    AppState.activeServer = newServer
    const channelData = {
      members: [],
      messages: [],
      title: "GeneralChat",
      server: newServer.id,
    };

    const serverMemberData = {
      user: serverData.owner,
      server: newServer.id,
    };
    const ownerServerMemberRecord = await pb
      .collection(Collections.Members)
      .create(serverMemberData);
    console.log(ownerServerMemberRecord);

    const defaultChannel = await pb
      .collection(Collections.Channels)
      .create(channelData);
    console.log(defaultChannel);

    await pb.collection(Collections.Messages).create({
      content: `Welcome to ${newServer.name}! Be Respectful and have fun!`,
      user: newServer.owner,
      channel: defaultChannel.id,
    });

    const fileUpload = await uploadService.getFileUploadStatusByUserId(
      serverData.owner!
    );
    await uploadService.updateStatus(serverData.owner!, fileUpload!.id);
    return newServer;
  }

  async getMembers(serverId: string) {
    const members = await pb
      .collection(Collections.Members)
      .getFullList<MemberUser>({
        filter: `server="${serverId}"`,
        expand: "user.onlineStatus",
      });

    AppState.members = members;
  }

  async DeleteServer(ownerId: string, serverId: string) {
    const user = AppState.user || pb.authStore.model;
    if (!user) {
      throw new Error("No User");
    }
    if (user.id != ownerId) {
      throw new Error("Not Authorized");
    }
    await pb.collection(Collections.Servers).delete(serverId);
    AppState.servers = AppState.servers.filter((s) => s.id != serverId);
    AppState.userServers = AppState.userServers.filter(
      (s) => s?.id != serverId
    );
  }

  async updateServer(id: string, data: ServersRecord) {
    const server = await this.getById(id);
    const newServer: ServersRecord = {
      name: data.name || server.name,
      description: data.description || server.description,
      image: data.image || server.image,
      private: data.private || server.private,
      members: data.members || server.members,
      owner: data.owner || server.owner,
    }
    const updatedServer = await pb.collection(Collections.Servers).update<Server>(id, newServer)
    AppState.activeServer = updatedServer;
    return updatedServer;
  }
}

export const serversService = new ServersService();
