/* eslint-disable @typescript-eslint/no-misused-promises */
// import { Server } from "http"
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import React from "react";
import { FaClipboard } from "react-icons/fa";
import { AppState } from "../../../../AppState";
import Pop from "../../../../utils/Pop";
// import type { Server } from "../../../PocketBaseTypes/utils"

const ShareLink = () => {
  const router = useRouter();
  const handleClick = async () => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
    const url = `${origin}/${router.asPath}/join`;
    console.log(router, origin);

    await navigator.clipboard.writeText(url);
    Pop.toast("Copied To ClipBoard");
  };

  return (
    <button className=" server-options-selection" onClick={handleClick}>
      getLink
      <FaClipboard size={20} />
    </button>
  );
};
export default observer(ShareLink);
