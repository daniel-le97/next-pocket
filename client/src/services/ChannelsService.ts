import { AppState } from "../../AppState";
import {
  ChannelsResponse,
  Collections,
  UsersResponse,
} from "../../pocketbase-types";
import { pb } from "../../utils/pocketBase";
import { PBChannel } from "../models/Channel";
import type { Message } from "../models/Message";
import { PBUser } from "../models/PBUser";

type ChannelData = { memberId: string; title: string };

class ChannelsService {
  async      joinChannel(data: ChannelData) {
    const user: UsersResponse = await pb
      .collection(Collections.Users)
      .getFirstListItem<UsersResponse>(`id="${data.memberId}"`);
      if (!user.currentChannel) {
        throw new Error("No Current Channel");
      }
      // Get the channel record user is apart of
    const channelToLeave = await pb
      .collection("channels")
      .getOne(user.currentChannel);
    

    if (channelToLeave) {
      await this.leaveChannel({
        id: user.currentChannel,
        memberId: data,
      });
    }

    // Get the channel record to join
    const channel = await pb
      .collection(Collections.Channels)
      .getFirstListItem<ChannelsResponse>(`title="${data.title}"`, {
        expand: "members",
      });
    

    if (!channel) {
      throw new Error("Channel not found");
    }
    AppState.activeChannel = channel;
    // console.log(AppState.activeChannel);

    // Add the user to the channel's member list
    const newMemberList = [...(channel.members as []), data.memberId];
    await pb
      .collection("channels")
      .update(channel.id, { members: newMemberList });

    await pb.collection("users").update(data.memberId, {
      currentChannel: channel.id,
    });
  }

  async leaveChannel(data: any) {
    // Get the channel record to leave
    const channel = await pb.collection("channels").getOne<PBChannel>(data.id);
    if (!channel) {
      throw new Error("Channel not found");
    }

    // Remove the user from the channel's member list
    const newMemberList = channel.members.filter(
      (member) => member !== data.memberId
    );
    await pb.collection("channels").update(data.id, { members: newMemberList });
  }

  async getChannels() {
    try {
      const res = await pb
        .collection(Collections.Channels)
        .getList<ChannelsResponse>(1, 50);

      AppState.channels = res.items;
      const channelTitles = res.items.map((i) => i.title);
      AppState.channelTitles = channelTitles;
      // return channelTitles;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get channel list");
    }
  }
}

export const channelsService = new ChannelsService();
