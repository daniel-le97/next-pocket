/* eslint-disable @typescript-eslint/no-floating-promises */
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { serversService } from "../services/ServersService";
import { membersService } from "../services/MembersService";
import { pb } from "../../utils/pocketBase";
import { AppState } from "../../AppState";
 
export const withAuth = (/** @type {JSX.IntrinsicAttributes | (import("react").FunctionComponent<{}> & { getInitialProps?(context: import("next").NextPageContext): {} | Promise<{}>; })} */ PageComponent) => {
  const AuthenticatedPageComponent = (/** @type {JSX.IntrinsicAttributes} */ props) => {
    const router = useRouter();
    const user = AppState.user;

    const checkAuth = async () => {
        if (!user) {
          AppState.lastPath = router.asPath
          return router.push('/login')
        }
       };

    useEffect(() => {
      checkAuth();
    }, [router]);

    return <PageComponent {...props} />;
  };

  return AuthenticatedPageComponent;
};
