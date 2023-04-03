/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { friendRequestService } from "@/services/FriendRequestsService";
import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppState } from "../../../AppState";
import { Collections, UsersResponse } from "../../../PocketBaseTypes";
import Pop from "../../../utils/Pop";
import { usersService } from "../../services";
import { pb } from "~/utils/pocketBase";
import { log } from "console";
import { debounce } from "lodash";
import Loader from "../GlobalComponents/Loader";

const AddFriend = () => {
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeUser, setActiveUser] = useState<UsersResponse | null>(null);
  const user = AppState.user!;
  const [query, setQuery] = useState("");
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await usersService.getAll();
        setUsers(res);
      } catch (error) {
        Pop.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (formValue) {
      checkUserExists(formValue);
    }
  }, [formValue]);

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

      receiverData: "",
    },
  });
  const handleChange = async (e: any) => {
    // const query = e.target.value;
    // setQuery(query);
    const val = e.target.value;
    // const re = /^(?=[a-zA-Z0-9._]{7,50}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    const tes = await checkUserExists(val);
    // console.log(tes);

    // if (val.length < 3) {
    //   setFormValue(val);
    //   setLoading(false);
    //   setIsValid(false);
    // }

    // if (re.test(val)) {
    //   setFormValue(val);
    //   setLoading(true);
    //   setIsValid(false);
    // }
  };

  const onSubmit = async (data: any) => {
    try {
      console.log(data);

      await friendRequestService.sendFriendRequest(data);
    } catch (error) {
      Pop.error(error);
    }
  };
  const validateReceiverData = (value) => {
    if (value.length <= 15) {
      return "Username must be more than 15 characters in length.";
    }
    if (!value.includes("#")) {
      return "Username must contain #.";
    }
    return true;
  };
  const checkUserExists = useCallback(
    debounce(async (data: string) => {
      try {
        setLoading(true);
        const receiverName = data.split("#")[0];
        const receiverFriendId = data.split("#")[1];

        const friendId = await pb
          .collection(Collections.Friends)
          .getFirstListItem(`id = "${receiverFriendId}" `);
        const username = await pb
          .collection(Collections.Users)
          .getFirstListItem(`username = "${receiverName}" `);
        if (friendId && username) {
          setIsValid(true);
          setLoading(false);
          return true;
        }
      } catch (error) {
        // setLoading(false);
        setIsValid(false);
        setLoading(false);
        console.error("Invalid Username or FriendId");
      }
    }, 1000),
    []
  );

  return (
    <>
      <div className="rounded-md  p-5">
        <div className=" text-lg font-bold text-zinc-200">Add Friend</div>
        <div className=" text-zinc-400">
          You can add a friend with their username and friendId. It's cAsE
          sEnSiTiVe
          <br />
          Example: TungusTheFungus#d1xf11e03i3mio2
        </div>
        <div className="relative flex flex-col py-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex w-full  py-4"
          >
            <input
              type="text"
              {...register("receiverData", {
                required: true,
                validate: validateReceiverData,
              })}
              className={`add-friend-input ${
                isValid ? "border-green-400" : ""
              }`}
              placeholder="...Username "
              onChange={handleChange}
            />

            <button
              className="send-friend-request-button"
              // disabled={Boolean(activeUser)}
              type="submit"
            >
              Send Friend Request
            </button>
          </form>
          <div className="absolute right-1/2 top-10 z-30">
            <Loader show={loading} />
          </div>

          {isValid ? (
            <div className="  flex items-center gap-x-2  p-2">
              <div className="text-green-400">✓</div>
              <div className="text-green-400">Valid</div>
            </div>
          ) : (
            <div className="  flex items-center gap-x-2  p-2">
              <div className="text-red-400">X</div>
              <div className="text-red-400">Invalid</div>
            </div>
          )}
          {/* {filteredUsers.length >= 1 && (
            <div className=" after:  absolute top-16 w-full   rounded-b-md bg-zinc-900   p-3 pt-8 transition-all   duration-150 ease-linear">
              <ul className="  max-h-72 overflow-y-auto  rounded-sm  p-1 ">
                {filteredUsers.length >= 1 &&
                  filteredUsers.map((u, index) => (
                    <li
                      key={index}
                      onClick={handleClick(u)}
                      className={
                        activeUser == u
                          ? "active-user-list-item"
                          : " user-list-item"
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
          )} */}
        </div>
      </div>
    </>
  );
};
export default observer(AddFriend);
