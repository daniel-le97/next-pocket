/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from "mobx-react";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import logo from "../../assets/LLCLOGO.png";
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
  FaCompass,
  // @ts-ignore
  FaFire,
  FaHome,
  // @ts-ignore
  FaPoo,
} from "react-icons/fa";
// @ts-ignore
import { AppState } from "../../../AppState";
import { pb } from "../../../utils/pocketBase";
import { authsService } from "../../services/AuthsService";
import ServerSelection from "./ServerSelection";
import DirectMessages from "./DirectMessages";
import { UsersResponse } from "../../../PocketBaseTypes/pocketbase-types";
import CreateServer from "./CreateServer";
import ThemeIcon from "./ThemeIcon";
import Pop from "../../../utils/Pop";

const SideBar = () => {
  const [user, setUser] = useState(null);

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
      <DirectMessages />
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
          <LogOutIcon />
          <SideBarIcon
            icon={<FaCompass size="28" />}
            text={"Explore Servers"}
            router={"/"}
          />
          <ServerSelection />
        </>
      ) : (
        <SideBarIcon
          icon={<FaArrowCircleRight size="22" />}
          text={"Login"}
          router={"/login"}
        />
      )}

      <div className="absolute bottom-3 left-1.5">
        <ThemeIcon />
        <CreateServer />
        <SideBarIcon
          icon={
            <img src={logo.src} alt="" width={50} className="rounded-full" />
          }
          text={"DevOpporunitiesLLC"}
          router={"/"}
        />
      </div>
    </div>
  );
};

// @ts-ignore
const SideBarIcon = ({ icon, text, router }) => {
  return (
    <Link href={router}>
      <div className=" sidebar-icon group ">
        {icon}
        <span className=" sidebar-tooltip group-hover:scale-100">{text} </span>
      </div>
    </Link>

    
  );
};

const UserIcon = ({ user }: { user: UsersResponse }) => {
  return (
    <div className="sidebar-icon group">
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
      <div className="sidebar-user-tooltip   group-hover:scale-100 ">
        <div className="shadow-lx relative">
          <div className="rounded-t-md bg-red-100 py-8"></div>
          <img
            src={user?.avatarUrl}
            alt="UserIcon"
            width={80}
            className="absolute left-3 top-6 rounded-full border-8 border-zinc-700 shadow-md"
          />
          <div className="absolute"></div>
          <div className="rounded-b-md bg-zinc-700 p-3">
            <div className="mt-12 rounded-md bg-zinc-900 p-2 ">
              <p className="text-xl">{user?.username}</p>
              <hr className="my-2  border-gray-600" />
              <div className="">
                <p className="text-md font-bold ">MEMBER SINCE</p>
                <p className="  font-mono text-gray-400  ">
                  {new Date(user.created).toLocaleDateString()}
                </p>
              </div>
              <hr className="my-2  border-gray-600" />
              <div className="">LogOut</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Divider = () => <hr className="sidebar-hr" />;
const LogOutIcon = () => {
  const router = useRouter();
  // const logOut = useLogOut();

  const logOut = async () => {
 const confirmed = await Pop.confirm('LogOut?','Will be redirected to login page','Logout','question');
    if (!confirmed) {
     return
    } 
    pb.authStore.clear();
    router.push("/login");
  };

  const confirmLogout = async () => {
    const confirmed = await Pop.confirm();
    if (confirmed) {
      console.log("User confirmed logout.");
    } else {
      console.log("User canceled logout.");
    }
  };
  return (
    <div className=" sidebar-icon group " onClick={logOut}>
      <FaArrowCircleRight size="28" />
      <span className=" sidebar-tooltip group-hover:scale-100">Logout</span>
    </div>
  );
};
export default observer(SideBar);
