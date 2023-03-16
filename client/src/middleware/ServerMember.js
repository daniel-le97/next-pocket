/* eslint-disable @typescript-eslint/no-floating-promises */
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { serversService } from "../services/ServersService";
import { membersService } from "../services/MembersService";
import { pb } from "../../utils/pocketBase";
import React from "react";

export const isMember = (
  /** @type {JSX.IntrinsicAttributes | (import("react").FunctionComponent<{}> & { getInitialProps?(context: import("next").NextPageContext): {} | Promise<{}>; })} */ PageComponent
) => {
  const AuthenticatedPageComponent = (
    /** @type {JSX.IntrinsicAttributes} */ props
  ) => {
    
    const router = useRouter();
    const id = router.query.id;
    const hi = router
    const user = pb.authStore.model;
    // console.log('user:' + `${user.id}`, 'serverId:' + `${id}`);
    const checkAuth = async () => {
      console.log(hi);
 
      const member = await membersService.getUserMemberRecord({
        user: user.id,
        server: id,
      });
      //  TODO do something if the member record is not found
      // console.log(member);
    };

    useEffect(() => {
      checkAuth();
    }, [id]);

    if (!id) {
      return <div>loading</div>
    }

    return <PageComponent {...props} />;
  };

  return AuthenticatedPageComponent;
};
