import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaAirbnb, FaFire, FaHome, FaPoo } from "react-icons/fa";

const SideBar = () => {
  return (
    <div
      className="fixed top-0 left-0 flex h-screen w-16 flex-col
                  bg-white shadow-lg dark:bg-gray-900"
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
  <div className=" group sidebar-icon ">
    {icon}
    <span className=" sidebar-tooltip group-hover:scale-100">{text} </span>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
