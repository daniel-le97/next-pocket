import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppState } from "../../../AppState";
import { UsersResponse } from "../../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../../utils/pocketBase";
import Pop from "../../../utils/Pop";
import { friendService } from "../../services/FriendService";
import { userService } from "../../services/UserService";

const AddFriend = () => {
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const user = AppState.user!
  const [query, setQuery] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userService.getUsersList();

        setUsers(res);
      } catch (error) {
        Pop.error(error);
      }
    };
    fetchUsers();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderId: user?.id,
      receiverId: activeUser?.id,
      status: "pending",
      receiverName: "",
    },
  });
  const handleChange = (event) => {
    const query = event.target.value;
    setQuery(query);

    const filtered = users.filter(
      (u) => u.username.includes(query) && u.username !== user.username
    );

    setFilteredUsers(filtered);
    if (query === "") {
      setActiveUser(null);
      setFilteredUsers([]);
    }
  };
  const handleClick = (user: any) => {
    return (event) => {
      setActiveUser(user);

      setValue("receiverId", user?.id);
      setValue("receiverName", user?.username);
      console.log(getValues("receiverName"));
    };
  };
  const onSubmit = async (data: any) => {
    try {
      delete data.receiverName;
      console.log(data);

      await friendService.sendFriendRequest(data);
    } catch (error) {
      Pop.error(error);
    }
  };
  return (
    <>
      <div className="rounded-md  p-5">
        <div className=" text-lg font-bold text-zinc-200">Add Friend</div>
        <div className=" text-zinc-400">
          You can add a friend with their username. It's cAsE sEnSiTiVe
        </div>
        <div className="relative  flex py-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex w-full  py-4"
          >
            <input
              type="text"
              {...register("receiverName", { required: true, maxLength: 30 })}
              className={
                activeUser
                  ? " focus:shadow-outline z-10 w-full appearance-none rounded-md border border-2  border-green-400 border-transparent bg-zinc-900 bg-transparent p-5 leading-tight text-white shadow transition-all duration-200 ease-linear placeholder:text-zinc-300 focus:border-2 focus:border-indigo-500 focus:outline-none active:border-indigo-500 "
                  : "focus:shadow-outline z-10 w-full appearance-none rounded-md border  border-transparent bg-zinc-900 bg-transparent p-5 leading-tight text-white shadow transition-all duration-200 ease-linear placeholder:text-zinc-300 focus:border-2 focus:border-indigo-500 focus:outline-none active:border-indigo-500 "
              }
              placeholder="...Username "
              onChange={handleChange}
            />
            <button
              className={
                activeUser
                  ? " absolute right-3  bottom-7 z-50 rounded-md bg-indigo-700 p-2 font-semibold text-white transition-all duration-150 ease-linear hover:bg-opacity-80 "
                  : "absolute right-3  bottom-7 z-50 cursor-not-allowed rounded-md bg-indigo-700 bg-opacity-50 p-2 font-semibold text-white"
              }
            >
              Send Friend Request
            </button>
          </form>

          {filteredUsers.length >= 1 && (
            <div className=" after:  absolute top-16 w-full   rounded-b-md bg-zinc-900   p-3 pt-8 transition-all   duration-150 ease-linear">
              <ul className="  max-h-72 overflow-y-auto  rounded-sm  p-1 ">
                {filteredUsers.length >= 1 &&
                  filteredUsers.map((u, index) => (
                    <li
                      key={index}
                      onClick={handleClick(u)}
                      className={
                        activeUser == u
                          ? "my-2  w-1/3 cursor-pointer rounded-md border-2 border-indigo-500 bg-zinc-700 p-2 text-zinc-100 transition-all duration-150 ease-linear hover:bg-opacity-70"
                          : "my-2  w-1/3 cursor-pointer rounded-md bg-zinc-700 p-2 text-zinc-100 transition-all duration-150 ease-linear hover:bg-opacity-70"
                      }
                    >
                      <div className="flex gap-x-2">
                        <img
                          src={u.avatarUrl}
                          alt="userImage"
                          className="h-10 w-10 rounded-full"
                        />
                        <div className=" flex items-center">{u?.username}</div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default observer(AddFriend);
