import { pb } from "../utils/pocketBase"

export const useUser = () => {
  return pb.authStore.model
}