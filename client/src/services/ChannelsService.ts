import { AppState } from "../../AppState";
import type {
  ChannelsRecord,
  ChannelsResponse,
} from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";
import { usersService } from "./UsersService";
import { usersStatusService } from "./UsersStatusService";

type Data = { memberId: string; channelId: string };

class ChannelsService {
  async joinChannel(data: Data) {
    // Leave the current channel
    await this.leaveChannel({
      memberId: data.memberId,
      channelId: AppState.user?.currentChannel,
    });

    // Get the channel record to join
    const channelToJoin = await pb
      .collection(Collections.Channels)
      .getOne<ChannelsResponse>(data.channelId, { expand: "members" });

    // Add the user to the channel's member list
    const newMemberList = [...(channelToJoin.members as []), data.memberId];
    await pb.collection(Collections.Channels).update(channelToJoin.id, {
      members: newMemberList,
    });

    // await usersStatusService.updateCurrentChannel(data.channelId);

    // Update active channel in app state
    AppState.activeChannel = channelToJoin;
  }

  async leaveChannel(data: Data) {
    // Get the channel record to leave
    const channel = await pb
      .collection(Collections.Channels)
      .getOne<ChannelsResponse>(data.channelId);

    // Remove the user from the channel's member list
    const newMemberList = channel.members?.filter((m) => m !== data.memberId);
    await pb
      .collection("channels")
      .update(data.channelId, { members: newMemberList });
  }

  async getChannelsByServerId(serverId: string) {
    try {
      const res = await pb
        .collection(Collections.Channels)
        .getFullList<ChannelsResponse>(100, {
          filter: `server = "${serverId}"`,
        });
      // console.log('channels', res);

      AppState.channels = res;
      AppState.activeChannel = res[0];
      //TODO NEED TO FIGURE THIS OUT, NEED TO JOIN A CHANNEL  ON REFRESH IF YOU ARE NOT IN THE CHANNEL ALREADY ELSE  SKIP
      // if (AppState.activeChannel?.id !== AppState.user?.currentChannel) {
      //   // console.log(activeChannel);

      //   await this.joinChannel({
      //     memberId: AppState.user?.id!,
      //     channelId: AppState.activeChannel?.id!,
      //   });
      // }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get channel list");
    }
  }

  async createChannel(data: ChannelsRecord) {
    const newChannel = await pb
      .collection(Collections.Channels)
      .create<ChannelsResponse>(data);

    if (newChannel) {
      AppState.channels = [...AppState.channels, newChannel];
      AppState.activeChannel = newChannel;
    }
  }

  async deleteChannel(channelId: string) {
    const channelToJoin = AppState.channels.find(
      (c) => c.server === AppState.activeServer?.id
    );
    const data = {
      serverId: AppState.activeServer?.id,
      channelId: channelToJoin?.id,
    };
    await this.joinChannel(data);
    const channel = await pb.collection(Collections.Channels).delete(channelId);

    if (channel) {
      AppState.channels = AppState.channels.filter((c) => c.id !== channelId);
    }
  }

  async updateChannel(id: string, data: ChannelsRecord) {
    const channel = await pb
      .collection(Collections.Channels)
      .update<ChannelsResponse>(id, data);

    if (channel) {
      AppState.channels = AppState.channels.map((c) =>
        c.id === channel.id ? channel : c
      );
      AppState.activeChannel = channel;
    }
  }
}

export const channelsService = new ChannelsService();
