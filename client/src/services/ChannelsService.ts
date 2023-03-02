import { AppState } from "../../AppState";
import type {
  ChannelsResponse} from "../../pocketbase-types";
import {
  Collections,
  UsersResponse,
} from "../../pocketbase-types";
import { pb } from "../../utils/pocketBase";
// import { PBChannel } from "../models/Channel";
// import type { Message } from "../models/Message";
// import { PBUser } from "../models/PBUser";

type Data = { memberId: string; channelId: string };

class ChannelsService {
  async joinChannel(data: Data) {
    // const user: UsersResponse = await pb
    //   .collection(Collections.Users)
    //   .getFirstListItem<UsersResponse>(`id="${data.memberId}"`);
    //   if (!user.currentChannel) {
    //     throw new Error("No Current Channel");
    //   }
    //   // Get the channel record user is apart of
    // const channelToLeave = await pb
    //   .collection("channels")
    //   .getOne(user.currentChannel);

    //TODO Right now this is fuzzy match aka not good
    // const foundChannel = AppState.channels.find(c=>{
    //  return  c.members?.includes(data.memberId)
    // })
   
    
    const channelToLeave = await pb
      .collection(Collections.Channels)
      .getFirstListItem(`members.id ?= "${data.memberId}"`);
    if (channelToLeave) {
      await this.leaveChannel({
        memberId: data.memberId,
        channelId: channelToLeave.id,
      });
    }

    // Get the channel record to join
    const channelToJoin = await pb
      .collection(Collections.Channels)
      .getOne<ChannelsResponse>(data.channelId, {
        expand: "members",
      });

    if (!channelToJoin) {
      throw new Error("Channel not found");
    }
    AppState.activeChannel = channelToJoin;
    // console.log(AppState.activeChannel);

    // Add the user to the channel's member list
    const newMemberList = [...(channelToJoin.members as []), data.memberId];
    await pb
      .collection("channels")
      .update(channelToJoin.id, { members: newMemberList });

    await pb.collection("users").update(data.memberId, {
      currentChannel: channelToJoin.id,
    });
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
    const newMemberList = channel.members?.filter(
      (m) => m !== data.memberId
    );
    await pb.collection("channels").update(data.channelId, { members: newMemberList });
  }

  async getChannelsByServerId() {
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
