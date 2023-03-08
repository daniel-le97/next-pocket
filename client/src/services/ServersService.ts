import { AppState } from "../../AppState";
import type {
  FileUploadsResponse,
  ServerMembersResponse,
  ServersRecord,
  ServersResponse,
  UsersResponse,
} from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";

type ServerData = { user: string; server: string };
type TServerExpand<T> = {
  server: ServersResponse<T>;
};



class ServersService {
  async joinServer(data: ServerData) {
    // if no data is sent throw an error
    if (!data) {
      throw new Error("No FormData Sent");
    }

    // make sure user does not have a serverMember Record for the server already
    const userServerMemberRecord = await this.getUserServerMemberRecord(data);
    // console.log('userServerMemberRecord',userServerMemberRecord); 

    //if we have a record for this user is a member => don't go any further
    if (userServerMemberRecord) {
      return Pop.error("already a member of this server");
    }

    // create the serverMember Record
    const res = await pb
      .collection(Collections.ServerMembers)
      .create<ServerMembersResponse>(data,{
        expand:'server.image'
      });
      console.log(res);
      
    // return the response for use as a "hook"
    return res;
  }

  async getUserServerMemberRecord(data: ServerData) {
    // get the users membership for the server and return it
    const record = await pb
      .collection(Collections.ServerMembers)
      .getList<ServerMembersResponse>(1,1,{filter:
        `user="${data.user}" && server="${data.server}"`
      });
    return record.items[0];
  }
  async leaveServer(data: ServerData) {
    // get the memberShip to be deleted
    const memberShip = await this.getUserServerMemberRecord(data);
    if (!memberShip) {
      return Pop.error("unable to find server membership to delete");
    }
    // delete the user from the servers memberships
    return await pb.collection(Collections.ServerMembers).delete(memberShip.id);
  }

  async getUserServers(userId: string) {
    // get the servers the user has a membership record for
    const res = await pb.collection("serverMembers").getFullList<ServerMembersResponse<TServerExpand<FileUploadsResponse>>>({
      filter: `user="${userId}"`,
      expand: "server.image",
    });

    // filter out the servers from the serverMembers records
    const servers = res.map(member => member.expand?.server)
    console.log('userServers', res)
    return;
    
    
    // set the global state for usersServers
    AppState.userServers = servers
    
    // return everything
    return res
  }

  async getServersList() {
    // get all servers available
    const res = await pb
      .collection(Collections.Servers)
      .getList<ServersResponse>(1, 50, {
        expand: "image,members",
      });

    // add the servers to the global state
    AppState.servers = res.items;
    // console.log(AppState.servers);
  }

  async createServer(serverData: ServersRecord) {
    // create a server with the provided data
    const newServer = await pb
      .collection(Collections.Servers)
      .create<ServersResponse>(serverData);

    // update the global servers state if the server is created successfully
    if (newServer) {
      AppState.servers = [...AppState.servers, newServer];
    }
  }
}

export const serversService = new ServersService();
