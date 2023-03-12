import { observer } from "mobx-react";
import { UsersResponse } from "../../PocketBaseTypes/pocketbase-types";

export const UserBadge = ({ user }: { user: UsersResponse }) => {
  return (
    <div className="user-container flex gap-x-2  ">
      <div className="relative">
        <img
          src={user.avatarUrl}
          alt="userIcon"
          width={30}
          className="rounded-full shadow-md shadow-zinc-900"
        />
        <div className="absolute left-8 top-9">
          {/* {user && <UserStatus user={user} />} */}
        </div>
      </div>
      <small className=" font-bold text-rose-600">{user.username}</small>
    </div>
  );
};

export default observer(UserBadge);
