import { AppState } from "../../AppState";
import type {
  ServersRecord,
  ServersResponse,
  UsersRecord,
  UsersResponse,
} from "../../pocketbase-types";
import { Collections } from "../../pocketbase-types";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";

type ServerData = { memberId: string; id: string };
type Texpand = {
  members: UsersResponse[];
};

class ServersService {
  async joinServer(data: any) {
    if (!data) {
      throw new Error("No FormData Sent");
    }

    const res = await pb.collection("serverMembers").create(data);
    console.log(res);
    return res

  }

  async leaveServer(data: any) {
    await pb.collection('serverMembers').delete(data.id)
    // Get the channel record to leave
    // const serverToLeave = await pb.collection(Collections.Servers).getOne<ServersResponse>(data.id);
    // if (!serverToLeave) {
    //   throw new Error("Server Not Found");
    // }
    // //TODO FINISH THIS
    // // Remove the user from the channel's member list
    // const newMemberList = serverToLeave.members.filter(
    //   (member) => member !== data.memberId
    // );
    // await pb.collection(Collections.Servers).update(data.id, { members: newMemberList });
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
