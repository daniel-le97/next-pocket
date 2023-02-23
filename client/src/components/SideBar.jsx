import { observer } from "mobx-react";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import { BsPlus, BsFillLightningFill, BsGearFill, BsPerson } from "react-icons/bs";
import { FaAirbnb, FaArrowCircleRight, FaFire, FaHome, FaPoo } from "react-icons/fa";
import { AppState } from "../../AppState.js";
import { pb } from "../../utils/pocketBase";

const SideBar = () => {
  
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
      <SideBarIcon
        icon={<FaArrowCircleRight size="22" />}
        text={"Login"}
        router={"/login"}
      />
     
     <UserIcon/>

    </div>
  );
};

const SideBarIcon = ({ icon, text, router }) => (
  <Link href={router}>
    <div className=" sidebar-icon group ">
      {icon}
      <span className=" sidebar-tooltip group-hover:scale-100">{text} </span>
    </div>
  </Link>
);
const UserIcon = () => {
  useEffect(() => {
   const user = pb?.authStore?.model
 
   
  }, []);
   const [user,setUser] = useState( pb?.authStore?.model)

  return (
    <div className=" sidebar-icon group ">
      <img
        src={
          user?.avatarUrl
            ? user?.avatarUrl
            : "https://api.dicebear.com/5.x/bottts-neutral/svg"
        }
        alt="UserIcon"
        className="rounded-full"
      />
      <span className=" sidebar-tooltip group-hover:scale-100">
        {" "}
        {user?.username}{" "}
      </span>
    </div>
  );



}
;

const Divider = () => <hr className="sidebar-hr" />;




export default  observer( SideBar);
