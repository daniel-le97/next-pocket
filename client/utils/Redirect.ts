/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { realpath } from "fs"
import { NextRouter, useRouter } from "next/router"
import { Route } from "nextjs-routes"
import { PassThrough } from "stream"
import { string } from "zod"
import { AppState } from "../AppState"

export const getRedirectOrPath = () => {
  const path = AppState.lastPath
  if(path)return path
  return '/'
}

// type Path = '/' | 'server/id'
export const setRedirect = (path: Route) => {
  const { pathname, query } = path;
  let redirect: string

  if (query) {
    const keys = Object.keys(query);
    const firstKey = keys[0];
    const firstValue = query[firstKey];
    const url = `${pathname.replace(`[${firstKey}]`, firstValue)}`;
    redirect = url
  }else redirect = pathname
  console.log(redirect);
  
  AppState.lastPath = redirect
};



 
  



