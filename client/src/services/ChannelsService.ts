import { AppState } from "../../AppState";
import type {
  ChannelsRecord,
  ChannelsResponse,
} from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";

type Data = { memberId: string; channelId: string };

class ChannelsService {
  async joinChannel(data: Data) {
    // console.log(data);

    const channelsToLeave = await pb
      .collection(Collections.Channels)
      .getFullList({ filter: `members.id ?= "${data.memberId}"` });
    // console.log('joining channel');
    const channelToLeave = channelsToLeave[0];
    if (channelToLeave?.id !== AppState.user?.currentChannel) {
      await this.leaveChannel({
        memberId: data.memberId,
        channelId: channelToLeave.id,
      });
    } else {
      // Get the channel record to join
      const channelToJoin = await pb
        .collection(Collections.Channels)
        .getOne<ChannelsResponse>(data.channelId, {
          expand: "members",
        });

      // Add the user to the channel's member list
      const newMemberList = [...(channelToJoin.members as []), data.memberId];
      await pb
        .collection("channels")
        .update(channelToJoin.id, { members: newMemberList });

      await pb.collection("users").update(data.memberId, {
        currentChannel: channelToJoin.id,
      });
      AppState.activeChannel = channelToJoin;
    }
  }

  async leaveChannel(data: Data) {
    // Get the channel record to leave
    const channel = await pb
      .collection(Collections.Channels)
      .getOne<ChannelsResponse>(data.channelId);
    if (!channel) {
      throw new Error("Channel not found");
    }

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

    console.log(newChannel);
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
    }
  }
}

export const channelsService = new ChannelsService();
