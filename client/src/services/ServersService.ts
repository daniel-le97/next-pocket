

import { AppState } from "../../AppState";
import type {
  ServersResponse,
  UsersRecord,
  UsersResponse} from "../../pocketbase-types";
import {
  Collections
} from "../../pocketbase-types";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";


type ServerData = { memberId: string; title: string, id: string };

class ServersService {
  async joinServer(data: ServerData) {
    const user: UsersResponse = await pb
      .collection(Collections.Users)
      .getFirstListItem<UsersResponse>(`id="${data.memberId}"`);
    if (!user) {
      throw new Error("No Current Server");
    }
    // Get the server record user is apart of
    // const serverToLeave = await pb
    //   .collection(Collections.Servers)
    //   .getOne(user);

    // if (serverToLeave) {
    //   await this.leaveServer({
    //     id: user.currentChannel,
    //     memberId: data,
    //   });
    // }

    //TODO GET SERVERID SOMEHOW
    // Get the server record to join
    // const server = await pb
    //   .collection(Collections.Servers)
    //   .getOne<ServersResponse>(data.id)

    // if (!server) {
    //   throw new Error("Channel not found");
    // }
    // AppState.activeServer = server;
    // // console.log(AppState.activeChannel);

    // // Add the user to the channel's member list
    // const newMemberList = [...(server.members), data.memberId];
    // await pb
    //   .collection("channels")
    //   .update(channel.id, { members: newMemberList });

    // await pb.collection("users").update(data.memberId, {
    //   currentChannel: channel.id,
    // });
  }

  async leaveServer(data: any) {
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

  async getUserServers(userId: string){
    try {
      
      
        const servers = await pb
          .collection(Collections.Servers)
          .getFullList<ServersResponse>(50, {
            filter: `members.id ?= "${userId}"`,
          });
        console.log(servers)
        return servers
      } catch (error) {
        // Pop.error(error)
        console.error(error);
        
      }
  }

  async getServersList() {
    try {
      const res  = await pb
        .collection(Collections.Servers)
        .getList<ServersResponse>(1, 50);

      AppState.servers = res.items
     
 
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get channel list");
    }
  }

  async getServersByUserId(){
    try {
      const user = pb.authStore.model
      const res = await pb.collection(Collections.Servers).getList<ServersResponse>(1,50,{
        filter:`members ?= ${user?.id}`
      })
      console.log(res);
      AppState.activeServer 
    } catch (error) {
      console.error(error);
      
    }
  }
}

export const serversService = new ServersService();
