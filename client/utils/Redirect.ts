import { AppState } from "../AppState"


export const getRedirectOrPath = () => {
  const path = AppState.lastPath
  if(path)return path
  return '/'
}

// type Path = '/' | 'server/id'
export const setRedirect = (path: string) => {
  AppState.lastPath = path
  return path
};


 
  



