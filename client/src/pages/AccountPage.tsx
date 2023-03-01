
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
// import { AppState } from "../../AppState.js";
import { pb } from "../../utils/pocketBase";
import { serversService } from "../services/ServersService";

function AccountPage() {
  const [user, setUser] = useState()
  const [servers, setServers] = useState()
  useEffect(() => {
    console.log(pb.authStore.model);
    setUser(pb.authStore.model);
    serversService.getUserServers(pb.authStore.model?.id).then(value => setServers(value))
  }, []);

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
