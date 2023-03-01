/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { observer } from "mobx-react";
import { Admin, Record } from "pocketbase";
import React, { useEffect, useState } from "react";
import { ServersResponse } from "../../pocketbase-types";
// import { AppState } from "../../AppState.js";
import { pb } from "../../utils/pocketBase";
import { serversService } from "../services/ServersService";

function AccountPage() {
  const [user, setUser] = useState<Record | Admin | null>()
  const [servers, setServers] = useState<ServersResponse<unknown>>()
  useEffect(() => {
    console.log(pb.authStore.model);
    const currentUser = pb.authStore.model
    if (currentUser) {
      setUser(currentUser);
      const getServers = async () => {
        const servers = await serversService.getUserServers(currentUser.id)
        setServers(servers)
      }
      getServers()
    }
    serversService.getUserServers(pb.authStore.model?.id).then(value => setServers(value))
  }, [user]);

  return (
    <div className="account-page">
      <div className="card">
        <div className="card-body p-5 text-center">{JSON.stringify(user)}</div>
        <div className="card-body p-5 text-center">{servers}</div>
      </div>
    </div>
  );
}

export default observer(AccountPage);
