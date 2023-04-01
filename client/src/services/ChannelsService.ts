import { AppState } from "../../AppState";
import type { ChannelsRecord, ChannelsResponse } from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";

type Data = { memberId: string; channelId: string };

class ChannelsService {
  async joinChannel(data: Data) {
    // console.log(data);
    
    const channelsToLeave = await pb
      .collection(Collections.Channels)
      .getFullList({ filter:`members.id ?= "${data.memberId}"`});
      // console.log('joining channel');
      const channelToLeave = channelsToLeave[0]
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

   
    AppState.activeChannel = channelToJoin;
 

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

      AppState.channels = res
      AppState.activeChannel = res[0]
      
      
      const activeChannel = AppState.activeChannel;
      if (activeChannel && AppState.user) {
    // console.log(activeChannel);
    
        await this.joinChannel({memberId: AppState.user.id, channelId: activeChannel.id})
      }
      

      const channelTitles = res.map((i) => i.title);
      AppState.channelTitles = channelTitles;

      // return channelTitles;
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
      
    const channel = await pb
      .collection(Collections.Channels)
      .delete(channelId);

    if (channel) {
      AppState.channels = AppState.channels.filter((c) => c.id !== channelId);
    }
  }
}

export const channelsService = new ChannelsService();
