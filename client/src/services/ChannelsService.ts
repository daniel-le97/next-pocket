import { AppState } from "../../AppState";
import { pb } from "../../utils/pocketBase";
import { PBChannel } from "../models/Channel";
import type { Message } from "../models/Message";
import { PBUser } from "../models/PBUser";

type joinChannelData = { memberId: string, title: string }

class ChannelsService {
  async joinChannel(data: joinChannelData) {
    const user = await pb
      .collection("users")
      .getFirstListItem<PBUser>(`id="${data.memberId}"`);

    // Get the channel record user is apart of
    const channelToLeave = await pb
      .collection("channels")
      .getOne(user.currentChannel.id);

    if (channelToLeave) {
      await this.leaveChannel({
        id: user.currentChannel.id,
        memberId: data
      });
    }

    // Get the channel record to join
    const channel = await pb
      .collection("channels")
      .getFirstListItem<PBChannel>(`title="${data.title}"`, {
        expand: "members",
      });

    if (!channel) {
      throw new Error("Channel not found");
    }
    AppState.activeChannel = channel;
    // console.log(AppState.activeChannel);
    

    //TODO need to find the channel that the user is IN, not the channel record to join

    // // Check if user is already in a channel
    // const currentChannelQuery = pb
    //   .collection("channels")
    //   .query()
    //   .where("members", "array_contains", data.memberId);
    // const currentChannel = await currentChannelQuery.getFirstListItem({
    //   expand: "members",
    // });

    // Add the user to the channel's member list
    const newMemberList = [...channel.members, data.memberId];
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







  async getChannels(){
   const res = await pb.collection('channels').getList(1,50)

  }
}

export const channelsService = new ChannelsService();
