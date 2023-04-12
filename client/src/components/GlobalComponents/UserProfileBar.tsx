import { Tooltip } from "@nextui-org/react";
import { observer } from "mobx-react";
import { FaCopy } from "react-icons/fa";
import { AppState } from "~/AppState";
import UserAvatar from "./UserAvatar";
import {useState} from 'react'
import { UsersResponse } from "~/PocketBaseTypes";
const UserProfileBar = ({ user }: { user: UsersResponse }) => {
  const [isHovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const handleClick = () => {
    setHovered(!isHovered);
  };
  return (
    user && (
      <div className="group">
        <button onFocus={handleClick} className="user-bar group ">
          <div className=" user-bar-container">
            <UserAvatar avatarUrl={user.avatarUrl} height="w-9" width="h-9" />

            <div className=" truncate font-semibold  text-white">
              {user?.username}
            </div>
          </div>
        </button>

        <div className={`user-modal  ${isHovered ? "scale-100" : "scale-0"} `}>
          <div className="user-modal-banner"></div>
          <div className="user-modal-user-image">
            <UserAvatar avatarUrl={user.avatarUrl} height="w-20" width="h-20" />
          </div>
          {/* <img
          src={user?.avatarUrl}
          alt="UserIcon"
          className="user-modal-user-image"
        /> */}

          <div
            className="mx-2 mt-16  rounded-md p-2 "
            style={{
              backgroundColor: "#111214",
            }}
          >
            <p className="p-2 text-xl">{user?.username}</p>
            <hr className="my-2  border-gray-600" />
            <div className="p-2">
              <p className="text-md font-bold ">MEMBER SINCE</p>
              <p className="  font-mono text-gray-400  ">
                {new Date(user.created).toLocaleDateString()}
              </p>
            </div>
            <hr className="my-2  border-gray-600" />

            <div className="">
              <Tooltip
                trigger={showTooltip ? "click" : "hover"}
                content={showTooltip ? "Copied!" : "Copy to Clipboard"}
                color={showTooltip ? "success" : "invert"}
                visible={showTooltip}
              >
                <div
                  className="  text-md group/item flex w-96 cursor-pointer justify-between rounded  p-2  "
                  onClick={(e) => {
                    setShowTooltip(true);
                    setTimeout(() => setShowTooltip(false), 1500);
                    navigator.clipboard.writeText(
                      user.username + "#" + AppState.userStatus?.id
                    );
                  }}
                >
                  {user.username + "#" + AppState.userStatus?.id}
                  <div className="opacity-0 group-hover/item:opacity-100">
                    <FaCopy
                      size={20}
                      className={showTooltip ? "text-green-5  00" : ""}
                    />
                  </div>
                </div>
              </Tooltip>
            </div>
            <div className="">LogOut</div>
          </div>
        </div>
      </div>
    )
  );
};
export default observer(UserProfileBar);
