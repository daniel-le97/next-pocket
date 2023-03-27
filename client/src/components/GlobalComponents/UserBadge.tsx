import { observer } from "mobx-react";
import { UsersResponse } from "../../../PocketBaseTypes/pocketbase-types";
import UserAvatar from "./UserAvatar";

export const UserBadge = ({ user }: { user: UsersResponse }) => {
  return (
    <div className="user-container flex gap-x-2  items-center ">
      <div className="relative">
        <UserAvatar avatarUrl={user.avatarUrl} width="w-10" height="h-10"  />

        <div className="absolute left-8 top-9">
          {/* {user && <UserStatus user={user} />} */}
        </div>
      </div>
      <small className=" font-bold text-rose-600">{user.username}</small>
    </div>
  );
};

export default observer(UserBadge);
