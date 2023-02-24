/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from "mobx-react";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import {
  // @ts-ignore
  BsPlus,
  // @ts-ignore
  BsFillLightningFill,
  // @ts-ignore
  BsGearFill,
  BsPerson,
} from "react-icons/bs";
import {
  // @ts-ignore
  FaAirbnb,
  FaArrowCircleRight,
  // @ts-ignore
  FaFire,
  FaHome,
  // @ts-ignore
  FaPoo,
} from "react-icons/fa";
// @ts-ignore
import { AppState } from "../../AppState.js";
import { pb } from "../../utils/pocketBase";
import { authsService } from "../services/AuthsService";

const SideBar = () => {
   const [user, setUser] = useState(null);
   const router = useRouter()

   function logOut (){
    authsService.signOut()
    router.push('/login')
   }

   useEffect(() => {
     // @ts-ignore
     setUser(pb.authStore.model);
   }, []);
  return (
    <div
      className="
              sidebar  "
    >
      <SideBarIcon icon={<FaHome size="28" />} text={"home"} router={"/"} />
      <Divider />
      <SideBarIcon
        icon={<BsPerson size="32" />}
        text={"Account"}
        router={"/AccountPage"}
      />

      <Divider />

      {user ? (
        <>
          <UserIcon user={user} />
          <Divider />
          <div onClick={logOut}>
          <SideBarIcon
          icon={<FaArrowCircleRight size="22" />}
          text={"Logout"}
          router={'/login'}
          // onClick={logOut()}
          />
          </div>
        </>
      ) : (
        <SideBarIcon
          icon={<FaArrowCircleRight size="22" />}
          text={"Login"}
          router={"/login"}
        />
      )}
    </div>
  );
};

// @ts-ignore
const SideBarIcon = ({ icon, text, router }) => (
  <Link href={router}>
    <div className=" sidebar-icon group ">
      {icon}
      <span className=" sidebar-tooltip group-hover:scale-100">{text} </span>
    </div>
  </Link>
);
// @ts-ignore
const UserIcon = ({user}) => {
  return (
    <div className="sidebar-icon group" >
      <img
        src={
          // @ts-ignore
          user?.avatarUrl
            ? // @ts-ignore
              user?.avatarUrl
            : `https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${user.username}`
        }
        alt="UserIcon"
        className="rounded-full"
      />
      <span className="sidebar-user-tooltip group-hover:scale-100">
        <div className="">
          <div className="rounded-t-md bg-red-100 p-3"></div>
          <div className="rounded-b-md bg-zinc-700 p-3">
            <img
              src={user?.avatarUrl}
              alt="UserIcon"
              className="mb-2 rounded-full border-4 border-zinc-900"
            />
            <div className="rounded-md bg-zinc-900 p-2 ">
              <p className="text-xl">{user?.username}</p>
              <hr className="my-2" />
              <div className="">
                <p className="text-md font-bold ">MEMBER SINCE</p>
                <p className="text-light font-sans ">
                  {new Date(user.created).toLocaleDateString()}
                </p>
              </div>
              <hr className="my-2" />
              <div className="">
                LogOut
              </div>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};
const Divider = () => <hr className="sidebar-hr" />;



export default observer(SideBar);
