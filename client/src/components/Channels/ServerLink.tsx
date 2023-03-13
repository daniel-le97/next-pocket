/* eslint-disable @typescript-eslint/no-misused-promises */
// import { Server } from "http"
import { observer } from "mobx-react"
import { useRouter } from "next/router"
import React from 'react'
// import type { Server } from "../../../PocketBaseTypes/utils"

const ServerLink = () =>{
  const router = useRouter()
  const handleClick = async() =>{
     const origin =
       typeof window !== "undefined" && window.location.origin
         ? window.location.origin
         : "";
    const url = `${origin}/${router.asPath}/join`
    console.log(router, origin);
    
    await navigator.clipboard.writeText(url)
  }

  return (<button className=" bg-blue-600 hover:bg-blue-300 rounded" onClick={handleClick}>getLink</button>)
}
export default observer(ServerLink)