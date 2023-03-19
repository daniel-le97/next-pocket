/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppState } from "../../AppState";
import type {
  ServersRecord,
  ServersResponse} from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import type { Server , MemberUser} from "../../PocketBaseTypes/utils";
import { pb} from "../../utils/pocketBase";
import { uploadService } from "./UploadService";

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
  async getServersList() {
    // get all servers available
    const res = await pb
      .collection(Collections.Servers)
      .getList<Server>(1, 50, {
        expand: "image,members",
        sort: `created`,
      });

    // add the servers to the global state
    AppState.servers = res.items;
    console.log("servers", res.items);

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

      AppState.userServers = [...AppState.userServers,newServer]
      AppState.servers = [...AppState.servers,newServer]
      // AppState.activeServer = newServer
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
        expand: "user",
      });

    AppState.members = members;
  }

  async DeleteServer(ownerId: string, serverId: string) {
    const user = AppState.user || pb.authStore.model
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
}

export const serversService = new ServersService();
