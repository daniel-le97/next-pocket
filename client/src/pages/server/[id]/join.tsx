/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { observer } from "mobx-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AppState } from "../../../../AppState";
import { useUser } from "../../../../hooks/User";
import { MembersRecord, ServersResponse } from "../../../../PocketBaseTypes/pocketbase-types";
import Pop from "../../../../utils/Pop";
import { membersService } from "../../../services/MembersService";
import { serversService } from "../../../services/ServersService";

const ServerLink : NextPage = () => {
  const user = useUser()
  const router = useRouter()
  const id = router.query.id as string
  const [server, setServer] = useState<ServersResponse>()

  // const getServer = async() => {
  //   return serversService.getById(id)
  // }
  // getServer()

  useEffect(() => {
    if(router.isReady){
      const getServer = async () => {
        const serverToJoin = await serversService.getById(id);
        setServer(serverToJoin);
      };
            if (!user) {
              AppState.lastPath = `server/${router.query.id}/join`;
              router.push("/login");
              return
            }
          const createMember = async () =>{
            try {
              const data: MembersRecord = {
                user: user.id,
                server: id
            }
            const member = await membersService.joinServer(data)
            const isNew = member?.new
            if(isNew){
             Pop.success(`Welcome to ${AppState.activeServer?.name}`)
            }
            router.push(`/server/${id}`)
          } catch (error) {
            Pop.error(error, `server/${id}/join`)
          }
        }

      getServer();
      createMember()

    }
  }, [router, id])



  
  // if(!user){
  //   AppState.lastPath = `server/${router.query.id}/join`
  //   return router.push('/login')
  // }
  // const createMember = async () =>{
  //   try {
  //     const data: MembersRecord = {
  //       user: user.id,
  //       server: id
  //     }
  //     const member = await membersService.joinServer(data)
  //     const isNew = member?.new == true
  //     if(isNew){
  //      Pop.success(`Welcome to ${}`)
  //     }
  //   } catch (error) {
      
  //   }
  // }
  return (<><div>loading...</div></>)
}

export default observer(ServerLink)