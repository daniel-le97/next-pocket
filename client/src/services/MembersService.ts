import { AppState } from "../../AppState";
import type {
  FileUploadsResponse,
  MembersRecord,
  MembersResponse,
} from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import {
  Server,
  ServerWithRelations,
  TServerExpand,
} from "../../PocketBaseTypes/utils";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";
import { serversService } from "./ServersService";

class MembersService {
  async joinServer(data: MembersRecord) {
    // if no data is sent throw an error
    if (!data.user && !data.server) {
      throw new Error("No FormData Sent");
    }
    // return;

    // make sure user does not have a Member Record for the server already
    const userMemberRecord = await this.getUserMemberRecord(data);

    // if we have a record for this user is a member => don't go any further
    if (userMemberRecord) {
      return;
    }
    // create the Member Record
    const res = await pb
      .collection(Collections.Members)
      .create<MembersResponse<TServerExpand<FileUploadsResponse>>>(data, {
        expand:
          "server.image,server.channels(server),server.members(server).user",
      });

    const server = new Server(
      res.expand?.server as unknown as ServerWithRelations
    );

    AppState.userServers = [...AppState.userServers, server];
    AppState.activeServer = server;
    AppState.activeChannel = AppState.activeServer.channels[0];
    return server;
  }
  async getUserMemberRecord(data: MembersRecord, setMember?: boolean) {
    // get the users membership for the server and return it
    const record = await pb
      .collection(Collections.Members)
      .getList<MembersResponse>(1, 1, {
        filter: `user="${data.user}" && server="${data.server}"`,
      });
    const membership = record.items[0];
    if (setMember) {
      AppState.activeMembership = membership ?? null;
    }
    return membership;
  }
  async leaveServer(data: MembersRecord) {
    // get the memberShip to be deleted
    const memberShip = await this.getUserMemberRecord(data);
    if (!memberShip) {
      return Pop.error("unable to find server membership to delete");
    }

    //filter the server from the current userServers Array
    AppState.userServers = AppState.userServers.filter(
      (s) => s?.id !== data.server
    );

    // delete the user from the servers memberships
    return await pb.collection(Collections.Members).delete(memberShip.id);
  }
  async getUserServers(userId: string) {
    // get the servers the user has a membership record for
    const res = await pb
      .collection("Members")
      .getFullList<MembersResponse<TServerExpand<FileUploadsResponse>>>({
        filter: `user="${userId}"`,
        expand: "server.image,server.channels(server)",
      });
    // console.log("userServers", res);

    // filter out the servers from the Members records
    const servers = res.map(
      (member) =>
        new Server(member.expand?.server as unknown as ServerWithRelations)
    );
    // console.log('userServers', servers)
    // return;

    // set the global state for usersServers
    AppState.userServers = servers;

    // return everything
    return servers;
  }
}
export const membersService = new MembersService();
