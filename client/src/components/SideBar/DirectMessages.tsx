import { observer } from "mobx-react";
import { BsMessenger } from "react-icons/bs";

const DirectMessages = () => {
  return (
    <div className="sidebar-icon group">
      <BsMessenger size={22} />
      <span className=" sidebar-tooltip group-hover:scale-100">
        Direct Messages
      </span>
    </div>
  );
};

export default observer(DirectMessages);
