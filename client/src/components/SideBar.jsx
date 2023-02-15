import { observer } from "mobx-react";
import Link from "next/link.js";
import { BsPlus, BsFillLightningFill, BsGearFill, BsPerson } from "react-icons/bs";
import { FaAirbnb, FaArrowCircleRight, FaFire, FaHome, FaPoo } from "react-icons/fa";
import { AppState } from "../../AppState.js";

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
     
      <div className=" sidebar-icon group ">
        <img src={AppState.user?.avatarUrl} alt="" className="rounded-full" />
        <span className=" sidebar-tooltip group-hover:scale-100">
         
          {AppState.user?.username}{" "}
        </span>
      </div>
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
const UserIcon = ({user}) => (
 
    <div className=" sidebar-icon group ">
     <img src={user?.avatarUrl} alt="" />
      <span className=" sidebar-tooltip group-hover:scale-100"> {user?.username} </span>
    </div>

);

const Divider = () => <hr className="sidebar-hr" />;




export default  observer( SideBar);
