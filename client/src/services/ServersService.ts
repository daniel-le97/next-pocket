import { AppState } from "../../AppState";
import type {
  ServerMembersResponse,
  ServersRecord,
  ServersResponse,
  UsersResponse} from "../../pocketbase-types";
import {
  UsersRecord
} from "../../pocketbase-types";
import { Collections } from "../../pocketbase-types";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";

type ServerData = { user: string; server: string };
type Texpand = {
  members: UsersResponse[];
};

class ServersService {
  async joinServer(data: ServerData) {
    // if no data is sent throw an error
    if (!data) {
      throw new Error("No FormData Sent");
    }
    console.log(data);
    // make sure user does not have a serverMember Record for the server already
    const userServerMemberRecord = await this.getUserServerMemberRecord(data)
   if(userServerMemberRecord){
    return Pop.error("already a member of this server")
    // return
   }
    // create the serverMember Record
    const res = await pb.collection(Collections.ServerMembers).create<ServerMembersResponse>(data);
    // return the response for use as a "hook"
    return res

  }

 async getUserServerMemberRecord(data:ServerData){
    // get the users membership for the server and return it
    const record = await pb
      .collection(Collections.ServerMembers)
      .getFirstListItem<ServerMembersResponse>(`user="${data.user}" && server="${data.server}"`);
      return record
  }

  async leaveServer(data: ServerData) {
    // get the memberShip to be deleted
    const memberShip = await this.getUserServerMemberRecord(data)
    if(!memberShip){
      return Pop.error('unable to find server membership to delete')
    }
    // delete the user from the servers memberships
    await pb.collection(Collections.ServerMembers).delete(memberShip.id)
  }

  async getUserServers(userId: string) {
    try {
      const res = await pb.collection("serverMembers").getFullList({
        filter: `user = "${userId}"`,
        expand: "server,servers(serverMembers).image",
      });
      console.log(res);

      // AppState.userServers = res.map(s=> s.expand.server)
      // const servers = await pb
      //   .collection(Collections.Servers)
      //   .getFullList<ServersResponse<Texpand>>(50, {
      //     filter: `members.id ?= "${userId}"`,
      //     expand: "members",
      //   });
      // AppState.userServers = res
      // console.log("test", AppState.userServers);

      //  const memberIds =  servers.map(server => server.expand?.members.map(member => member.id))
      // console.log('getUserServers', servers)
      // return servers;
    } catch (error) {
      // Pop.error(error)
      console.error(error);
    }
  }

  async getServersList() {
    try {
      const res = await pb
        .collection(Collections.Servers)
        .getList<ServersResponse>(1, 50, {
          expand: "image,members",
        });
      AppState.servers = res.items;
      console.log(AppState.servers);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get channel list");
    }
  }

  async createServer(serverData: ServersRecord) {
    console.log(serverData);

    const newServer = await pb
      .collection(Collections.Servers)
      .create<ServersResponse>(serverData);

    AppState.servers = [...AppState.servers, newServer];
  }
}

export const serversService = new ServersService();
