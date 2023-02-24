// @ts-ignore
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { AppState } from "../../AppState.js";
import { pb } from "../../utils/pocketBase";

function AccountPage() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(pb.authStore.model);
    setUser(pb.authStore.model);
  }, []);

  return (
    <div className="account-page">
      <div className="card">
        <div className="card-body p-5 text-center">{JSON.stringify(user)}</div>
      </div>
    </div>
  );
}

export default observer(AccountPage);
