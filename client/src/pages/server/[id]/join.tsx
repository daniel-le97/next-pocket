/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { observer } from "mobx-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AppState } from "../../../../AppState";
import type { MembersRecord } from "../../../../PocketBaseTypes/pocketbase-types";
import Pop from "../../../../utils/Pop";
import { membersService } from "../../../services/MembersService";
import { serversService } from "../../../services/ServersService";

const ServerLink : NextPage = () => {
  const user = AppState.user
  const router = useRouter()
  const id = router.query.id as string
  // const [server, setServer] = useState<ServersResponse>()

  // const getServer = async() => {
  //   return serversService.getById(id)
  // }
  // getServer()

  useEffect(() => {
    if(id){
      const getServer = async () => {
        await serversService.getById(id);
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
            if(member){
             Pop.success(`Welcome to ${AppState.activeServer?.name}`)
             const channel = member?.channels[0]?.id
             await router.push(`/server/${id}/channel/${channel}}`)
            }
          } catch (error) {
            Pop.error(error, `server/${id}/join`)
          }
        }

      getServer();
      createMember()

    }
  }, [router, id])
  
  return (<><div>loading...</div></>)
}

export default observer(ServerLink)