import { observer } from "mobx-react";
import Link from "next/link.js";
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

const SideBar = () => {
   const [user, setUser] = useState(null);

   useEffect(() => {
     // @ts-ignore
     setUser(pb?.authStore?.model);
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
          <SideBarIcon
          
            icon={<FaArrowCircleRight size="22" />}
            text={"Logout"}
            router={"/login"}
          />
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
const UserIcon = ({user}) => {
  return (
    <div className="sidebar-icon group">
      <img
        src={
          // @ts-ignore
          user?.avatarUrl
            ? // @ts-ignore
              user?.avatarUrl
            : "https://api.dicebear.com/5.x/bottts-neutral/svg"
        }
        alt="UserIcon"
        className="rounded-full"
      />
      <span className="sidebar-tooltip group-hover:scale-100">
        {
          // @ts-ignore
          user?.username
        }
      </span>
    </div>
  );
};
const Divider = () => <hr className="sidebar-hr" />;

export default observer(SideBar);
