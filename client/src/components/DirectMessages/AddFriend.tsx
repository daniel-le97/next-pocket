/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { friendRequestService } from "@/services/FriendRequestsService";
import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppState } from "../../../AppState";
import {
  Collections,
  FriendRequestRecord,
  UsersResponse,
} from "../../../PocketBaseTypes";
import Pop from "../../../utils/Pop";
import { usersService } from "../../services";
import { pb } from "~/utils/pocketBase";
import { log } from "console";
import { debounce } from "lodash";
import Loader from "../GlobalComponents/Loader";
import { Tooltip } from "@nextui-org/react";
import { FaChevronRight, FaCompass, FaQuestionCircle } from "react-icons/fa";
import Link from "next/link";

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
      validateReceiverData(formValue);
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
      senderFriendId: AppState.userFriendId,
      receiverFriendId: "",
      status: "pending",

      receiverData: "",
    },
  });
  const handleChange = async (e: any) => {
    const val = e.target.value;
    setFormValue(val);
    const re = /^[a-zA-Z0-9]+#[a-zA-Z0-9]{15}$/;

    if (val !== "" && !re.test(val)) {
      await validateReceiverData(val);
    }

    if (re.test(val)) {
      setFormValue(val);

      setLoading(true);
      setIsValid(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (isValid) {
        delete data.receiverData;

        console.log(isValid, data);

        const res = await friendRequestService.sendFriendRequest(data);
        if (res) {
          Pop.success("Sent Friend Request!");
        }
      }
    } catch (error) {
      Pop.error(error);
    }
  };

  const validateReceiverData = useCallback(
    debounce(async (data: string) => {
      try {
        setLoading(true);
        const separatorIndex = data.indexOf("#");
        if (separatorIndex === -1) {
          setIsValid(false);
          setLoading(false);
          console.error("Invalid input format: no '#' separator found");
          return false;
        }
        const receiverName = data.substring(0, separatorIndex);
        const receiverFriendId = data.substring(separatorIndex + 1);

        const friendId = await pb
          .collection(Collections.Friends)
          .getFirstListItem(`id = "${receiverFriendId}" `);
        const username = await pb
          .collection(Collections.Users)
          .getFirstListItem(`username = "${receiverName}" `);
        if (friendId && username) {
          setValue("receiverFriendId", friendId.id);
          setIsValid(true);
          setLoading(false);
          return true;
        }
      } catch (error) {
        setIsValid(false);
        setLoading(false);
        console.error("Invalid Username or FriendId");
      }
      return false;
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
          beepo#7pav16sqx77dapf
        </div>
        <div className="relative flex flex-col py-4">
          <Tooltip
            placement="bottom"
            color="invert"
            content={<strong> Example: TungusTheFungus#d1xf11e03i3mio2</strong>}
          >
            <FaQuestionCircle size={25} className="text-gray-300" />
          </Tooltip>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex w-full  py-4"
          >
            <input
              type="text"
              {...register("receiverData", {
                required: true,
              })}
              className={`add-friend-input ${
                isValid ? "border-green-400" : ""
              }`}
              placeholder="Enter a Username#FriendId "
              onChange={handleChange}
            />

            <button
              className={`${
                !isValid
                  ? "send-friend-request-button-disabled"
                  : "send-friend-request-button "
              }`}
              disabled={!isValid}
              type="submit"
            >
              Send Friend Request
            </button>
          </form>
          <div className=" z-30">
            <Loader show={loading} />
          </div>

          {isValid && (
            <div className="  flex items-center gap-x-2  p-2">
              <div className="text-green-400">✓</div>
              <div className="text-green-400">Valid</div>
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
        <hr className="border-gray-500" />
        <div className="">
          <div className="my-3 text-lg font-bold text-gray-200">
            {" "}
            MAKE FRIENDS BY JOINING SERVERS AND CONNECTING{" "}
          </div>
          <Link href={"/"}>
            <div className="flex w-1/2  items-center justify-between rounded border border-gray-500 bg-zinc-800/40 py-2 px-4 hover:bg-zinc-500">
              <div className="flex items-center gap-x-2 text-gray-300">
                <div className="rounded-lg bg-gray-800 p-2">
                  <FaCompass size={30} />
                </div>
                Explore Public Servers
              </div>
              <FaChevronRight size={30} className="text-gray-300" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default observer(AddFriend);
