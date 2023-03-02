import type { MembershipResponse } from "../../pocketbase-types";
import { Collections } from "../../pocketbase-types"
import { pb } from "../../utils/pocketBase"
import Pop from "../../utils/Pop"

class MembersService {
  async getMembersByServer(serverId : string){
    try {
        const members = await pb.collection(Collections.Membership).getFullList<MembershipResponse>({filter: `serverId = ${serverId}`})
        return members
      } catch (error) {
        Pop.error(error,'getMembersByServer')
      }
  }
}
export const membersService = new MembersService()