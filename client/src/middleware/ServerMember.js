import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { serversService } from "../services/ServersService";
import { membersService } from "../services/MembersService";
import { pb } from "../../utils/pocketBase";
import React from "react";

// export const ServerMember = (PageComponent) => {
//   const AuthenticatedPageComponent = (props) => {
//     const router = useRouter();
//     const id = router.query.id;
//     const user = pb.authStore.model;

//     useEffect(() => {
//       const checkAuth = async () => {
//         // Check if the user is authenticated
//         if (!user ) {
//           router.push("/login");
//           return;
//         }

//      if(user){
//        // Check if the user is a member of the server
//        const member = await membersService.getUserMemberRecord({
//          user: user?.id,
//          // @ts-ignore
//          server: router.query.id,
//        });
//        console.log(member);
//        if (!member ) {
//          router.push("/");
//          return;
//        }
//      }
//       };
//       checkAuth();
//     }, [router]);

//     return <PageComponent {...props} />;
//   };

//   return AuthenticatedPageComponent;
// };
