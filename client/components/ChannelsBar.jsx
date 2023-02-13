import React from "react";
import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaAirbnb, FaFire, FaHome, FaPoo } from "react-icons/fa";

const ChannelsBar = () => {
  return (
    <div
      className=" ml-16 flex w-30  h-screen justify-start
                  bg-white shadow-lg dark:bg-gray-700"
    >
      <h1>Channels</h1>
      <div className="flex flex-col">
<Channel/>
      </div>
    </div>
  );
};

const Channel = () => {
  return (
    <div className=" collapse">
 <h1>New Room</h1>
    </div>
  )
}

// @ts-ignore
export default ChannelsBar