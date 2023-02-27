import { pb } from "../../utils/pocketBase"
import Pop from "../../utils/Pop"

class ChannelsService {
  async getChannelsByServerId(id: string){
    try {
        const channels = await pb.collection('channels').getFullList(50, {filter: id})
        return channels
      } catch (error) {
        Pop.error(error)
      }
  }
}
export const channelsService = new ChannelsService()