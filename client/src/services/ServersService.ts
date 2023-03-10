/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppState } from "../../AppState";
import type {
  ServersRecord,
  ServersResponse,
} from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import type { TServerExpand } from "../../PocketBaseTypes/utils";
import { Server } from "../../PocketBaseTypes/utils";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";
import { channelsService } from "./ChannelsService";

type ServerData = { user: string; server: string };
// type TServerExpand<T> = {
//   server: ServersResponse<T>;
// };

class ServersService {
  async joinServer(data: ServerData) {
    // if no data is sent throw an error
    if (!data) {
      throw new Error("No FormData Sent");
    }

    // make sure user does not have a serverMember Record for the server already
    const userServerMemberRecord = await this.getUserServerMemberRecord(data);
    console.log("is-member", "userServerMemberRecord", userServerMemberRecord);

    //if we have a record for this user is a member => don't go any further
    if (userServerMemberRecord) {
      return Pop.error("already a member of this server");
    }

    // create the serverMember Record
    const res = await pb
      .collection(Collections.ServerMembers)
      .create<ServerMembersResponse<TServerExpand<FileUploadsResponse>>>(data, {
        expand: "server.image",
      });
    console.log("joinedServer", res);
    // AppState.userServers = [...AppState.userServers,res.expand.server]
    // AppState.activeServer = res.expand?.server

    // return the response for use as a "hook"
    return res;
  }

  async getUserServerMemberRecord(data: ServerData) {
    // get the users membership for the server and return it
    const record = await pb
      .collection(Collections.ServerMembers)
      .getList<ServerMembersResponse>(1, 1, {
        filter: `user="${data.user}" && server="${data.server}"`,
      });
    return record.items[0];
  }
  async leaveServer(data: ServerData) {
    // get the memberShip to be deleted
    const memberShip = await this.getUserServerMemberRecord(data);
    if (!memberShip) {
      return Pop.error("unable to find server membership to delete");
    }

    //filter the server from the current userServers Array
    AppState.userServers = AppState.userServers.filter(
      (s) => s?.id != data.server
    );

    // delete the user from the servers memberships
    return await pb.collection(Collections.ServerMembers).delete(memberShip.id);
  }

  async getUserServers(userId: string) {
    // get the servers the user has a membership record for
    const res = await pb
      .collection("serverMembers")
      .getFullList<ServerMembersResponse<TServerExpand<FileUploadsResponse>>>({
        filter: `user="${userId}"`,
        expand: "server.image",
      });

    // filter out the servers from the serverMembers records
    const servers = res.map((member) => member.expand?.server);
    // console.log('userServers', servers)
    // return;

    // set the global state for usersServers
    AppState.userServers = servers;

    // return everything
    return servers;
  }

  async getServersList() {
    // get all servers available
    const res = await pb
      .collection(Collections.Servers)
      .getList<Server>(1, 50, {
        expand: "image,members",
      });

    // add the servers to the global state
    AppState.servers = res.items;
    console.log('servers',res.items);
    
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
