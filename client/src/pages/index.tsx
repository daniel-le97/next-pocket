/* eslint-disable @typescript-eslint/no-floating-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import SideBar from '../components/SideBar'
import ChannelsBar from '../components/ChannelsBar'
import ContentContainer from '../components/ContentContainer'
import React, {useEffect} from "react";
import { useRouter } from "next/router";
import { AppState } from "../../AppState";
import { authsService } from "../services/AuthsService";
import { pb } from "../../utils/pocketBase";
const Home: NextPage = () => {
const router = useRouter()
useEffect(() => {
  const user = pb.authStore.model
  if(!user){
    router.push('/login')
  }

}, [router])



// useEffect(() => {
//   const user = pb.authStore.model;
//   const subscribe = async () => {
//     const res = await pb
//       .collection("usersStatus")
//       .getFirstListItem(`userId = "${user?.id}"`);
//     // console.log(res);

//     // Update isOnline status to true on component mount
//     const data = {
//       userId: user?.id,
//       isOnline: true,
//     };
//     const updatedRecord = await pb
//       .collection("usersStatus")
//       .update(res.id, data);
//     // console.log(updatedRecord);

//     // Update isOnline status to false on beforeunload event
//     const handleBeforeUnload = async () => {
//       const data = {
//         userId: user?.id,
//         isOnline: false,
//       };
//       const updatedRecord = await pb
//         .collection("usersStatus")
//         .update(res.id, data);
//       console.log(updatedRecord);
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     // Remove the event listener on unmount
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   };
//   subscribe();
// }, []);





  return (
    <>
      <Head>
        <title>next-pocket</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div className="flex  w-full ">
          
       <SideBar  />
       <ChannelsBar/>
       <ContentContainer/>
        </div>
      </main>
    </>
  );
};

export default Home;
