/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from "mobx-react";
import Link from "next/link.js";
import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import logo from "../../assets/LLCLOGO.png";
import { BsPerson, BsMessenger, BsPersonFill } from "react-icons/bs";
import { FaArrowCircleRight, FaCompass } from "react-icons/fa";
import { pb } from "../../../utils/pocketBase";
import ServerSelection from "./ServerSelection";
import CreateServer from "./CreateServer";
import Pop from "../../../utils/Pop";
import useDarkMode from "../../../hooks/useDarkMode";
import { authsService, serversService } from "@/services";
import { AppState } from "~/AppState";
const SideBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // @ts-ignore
    setUser(pb.authStore.model);
  }, []);
  return (
    <div
      className="
              sidebar   "
    >
      <div className="border-b-2 border-b-emerald-500">
        <SideBarIcon
          icon={<FaCompass size="28" />}
          text={"Explore Servers"}
          router={"/"}
        />
        {/* <hr className="sidebar-hr" /> */}
        <SideBarIcon
          icon={<BsMessenger size="28" />}
          text={"Direct Messages"}
          router={"/DirectMessages"}
        />

        {/* <hr className="sidebar-hr" /> */}
        <SideBarIcon
          icon={<BsPersonFill size="28" />}
          text={"Account"}
          router={"/AccountPage"}
        />
{user  &&   <LogOutIcon />}
        {/* <hr className="sidebar-hr" /> */}
      </div>

      {user ? (
        <>
          {/* <UserIcon user={user} /> */}
          <div className=" server-selection overflow-y-scroll ">
            <ServerSelection />
          </div>
        </>
      ) : (
        <SideBarIcon
          icon={<FaArrowCircleRight size="22" />}
          text={"Login"}
          router={"/login"}
        />
      )}

      <div className="flex flex-col items-center justify-center border-t-2  border-t-emerald-500 pb-2">
        {/* <ThemeIcon /> */}
        <CreateServer />

        <img src={logo.src} alt="" width={35} className="rounded-full" />
        {/* <SideBarIcon
          icon={
            <img src={logo.src} alt="" width={30} className="rounded-full" />
          }
          text={"DevOpporunitiesLLC"}
          router={"/"}
        /> */}
      </div>
    </div>
  );
};

// @ts-ignore
const SideBarIcon = ({ icon, text, router }) => {
  return (
    <Link href={router}>
      <div className=" sidebar-icon group ">
        <Tooltip content={text} placement="right" color="invert">
          {icon}
        </Tooltip>
        {/* <span className=" sidebar-tooltip group-hover:scale-100">{text} </span> */}
      </div>
    </Link>
  );
};

const LogOutIcon = () => {
  const router = useRouter();
  // const logOut = useLogOut();

  const logOut = async () => {
    const confirmed = await Pop.confirm(
      "LogOut?",
      "Will be redirected to login page",
      "Logout",
      "question"
    );
    if (!confirmed) {
      return;
    }
    authsService.signOut();
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
    <div className=" sidebar-icon group  " onClick={logOut}>
      <Tooltip content="Logout" color="invert" placement="right">
        <FaArrowCircleRight size="28" />
      </Tooltip>
    </div>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();

  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span
      onClick={handleMode}
      className="group flex items-center justify-center"
    >
      {/* {darkTheme ? (
        <BsSun size="24" className="top-navigation-icon" />
      ) : (
        <BsMoon size="24" className="top-navigation-icon" />
      )} */}
      <Tooltip content="Toggle Theme" color="invert" placement="right">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3751/3751403.png"
          alt=""
          width={40}
          className="mx-3 cursor-pointer"
        />
      </Tooltip>
    </span>
  );
};

// const ExploreIcon = () => {
//   const handleClick = async () => {
//     try {
//       AppState.page = 1;
//       await serversService.getServersList(AppState.page);
//     } catch (error) {
//       Pop.error(error);
//     }
//   };
//   return (
//     <div className="" onClick={handleClick}>
//       <SideBarIcon
//         icon={<FaCompass size="28" />}
//         text={"Explore Servers"}
//         router={"/"}
//       />
//     </div>
//   );
// };
export default observer(SideBar);
