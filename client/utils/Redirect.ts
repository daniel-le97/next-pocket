import { AppState } from "../AppState"

export const getRedirectOrPath = () => {
  const path = AppState.lastPath
  if(path)return path
  return '/'
}