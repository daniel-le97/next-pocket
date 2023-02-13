import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaAirbnb, FaFire, FaHome, FaPoo } from "react-icons/fa";

const SideBar = () => {
  return (
    <div
      className="
              sidebar  "
    >
      <SideBarIcon icon={<FaHome size="28" />} text={"home"} />
      <Divider />
      <SideBarIcon icon={<BsPlus size="32" />} text={"home"} />
      <SideBarIcon icon={<BsFillLightningFill size="20" />} text={"home"} />
      <SideBarIcon icon={<FaPoo size="20" />} text={"home"} />
      <Divider />
      <SideBarIcon icon={<BsGearFill size="22" />} text={"home"} />
    </div>
  );
};

// @ts-ignore
const SideBarIcon = ({ icon, text }) => (
  <div className=" sidebar-icon group ">
    {icon}
    <span className=" sidebar-tooltip group-hover:scale-100">{text} </span>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;




export default SideBar;
