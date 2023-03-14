import { NextRouter, useRouter } from "next/router"
import { string } from "zod"
import { AppState } from "../AppState"

export const getRedirectOrPath = () => {
  const path = AppState.lastPath
  if(path)return path
  return '/'
}

export const setRedirect = (path: string) => {
  AppState.lastPath = path
}