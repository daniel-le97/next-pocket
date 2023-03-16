import { AppState } from "../AppState"
import { pb } from "../utils/pocketBase"

export const useUser = () => {
  const user = pb.authStore.model || AppState.user
  return user
}