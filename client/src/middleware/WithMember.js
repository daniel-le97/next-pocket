/* eslint-disable @typescript-eslint/no-floating-promises */
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { serversService } from "../services/ServersService";
import { membersService } from "../services/MembersService";
import { pb } from "../../utils/pocketBase";
import React from "react";
import { AppState } from "../../AppState";

export const withMember = (PageComponent) =>
  /** @type {JSX.IntrinsicAttributes | (import("react").FunctionComponent<{}> & { getInitialProps?(context: import("next").NextPageContext): {} | Promise<{}>; })} */
  {
    const MembershipComponent = (
      props /** @type {JSX.IntrinsicAttributes} */
    ) => {
      const router = useRouter();
      const id = router.query.id || AppState.lastQueryId;
      const user = pb.authStore.model;
      const [isMember, setIsMember] = useState(false);

      const checkIsMember = async () => {
        const member = await membersService.getUserMemberRecord({
          user: user.id,
          server: id,
        });

        setIsMember(!!member); // Update isMember state based on the member record
      };

      useEffect(() => {
        if (id) {
          checkIsMember();
        }
      }, [id]);

      if (isMember === false) {
        return <div>please join the server before trying</div>
      }

      // Render PageComponent when isMember state is true
      return <PageComponent {...props} />;
    };

    return MembershipComponent;
  };

