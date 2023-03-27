/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from "mobx-react";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import logo from "../../assets/LLCLOGO.png";
import { BsPerson, BsMessenger } from "react-icons/bs";
import { FaArrowCircleRight, FaCompass } from "react-icons/fa";
import { pb } from "../../../utils/pocketBase";
import ServerSelection from "./ServerSelection";
import CreateServer from "./CreateServer";
import Pop from "../../../utils/Pop";
import useDarkMode from "../../../hooks/useDarkMode";
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
      <div>
        <SideBarIcon
          icon={<FaCompass size="28" />}
          text={"Explore Servers"}
          router={"/"}
        />
        <hr className="sidebar-hr" />
        <SideBarIcon
          icon={<BsMessenger size={22} />}
          text={"Direct Messages"}
          router={"/DirectMessages"}
        />

        <hr className="sidebar-hr" />
        <SideBarIcon
          icon={<BsPerson size="32" />}
          text={"Account"}
          router={"/AccountPage"}
        />

        <hr className="sidebar-hr" />
      </div>

      {user ? (
        <>
          <div>
            <hr className="sidebar-hr" />
            <LogOutIcon />
          </div>
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

      <div>
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
    <div className=" sidebar-icon group  " onClick={logOut}>
      <FaArrowCircleRight size="28" />
      <span className=" sidebar-tooltip group-hover:scale-100">Logout</span>
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
      <img
        src="https://cdn-icons-png.flaticon.com/512/3751/3751403.png"
        alt=""
        width={40}
        className="mx-3 cursor-pointer"
      />
      <span className="sidebar-tooltip group-hover:scale-100">
        Toggle Theme
      </span>
    </span>
  );
};
export default observer(SideBar);
