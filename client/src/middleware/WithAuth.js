import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { serversService } from "../services/ServersService";
import { membersService } from "../services/MembersService";
import { pb } from "../../utils/pocketBase";
 
export const withAuth = (/** @type {JSX.IntrinsicAttributes | (import("react").FunctionComponent<{}> & { getInitialProps?(context: import("next").NextPageContext): {} | Promise<{}>; })} */ PageComponent) => {
  const AuthenticatedPageComponent = (/** @type {JSX.IntrinsicAttributes} */ props) => {
    const router = useRouter();
    const id = router.query.id 
    const user = pb.authStore.model;

    useEffect(() => {
      const checkAuth = async () => {
      
    

     
      };
      checkAuth();
    }, [router]);

    // @ts-ignore
    return <PageComponent {...props} />;
  };

  return AuthenticatedPageComponent;
};
