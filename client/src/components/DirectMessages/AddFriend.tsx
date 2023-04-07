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
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (formValue !== "") {
      validateReceiverData(formValue);
    }
    setFormError("");
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
      sender: AppState.userFriendId,
      receiver: "",
      status: "pending",
      receiverData: "",
    },
  });

  const handleChange = async (e: any) => {
    const val = e.target.value;
    setFormValue(val);
    const re = /^[a-zA-Z0-9]+#[a-zA-Z0-9]{15}$/;
    if (val === "") {
      console.log("13");

      return;
    }
    if (!re.test(val)) {
      await validateReceiverData(val);
      return;
    }

    setFormValue(val);
    setIsValid(false);
  };

  const onSubmit = async (data: any) => {
    try {
      if (isValid) {
        delete data.receiverData;
        // console.log(isValid, data);
        const res = await friendRequestService.sendFriendRequest(data);
        if (res) {
          reset();
          setFormValue("");
          setIsValid(false);
          setFormError("");
          Pop.success("Sent Friend Request!");
        }
      }
    } catch (error) {
      Pop.error(error);
    }
  };

  const validateReceiverData = useCallback(
    debounce(async (data: string) => {
      setLoading(true);
      const status = await usersService.checkIfUserCanAddFriend(data)
      if (status.error) return handleInvalidInput(status.error);
      if (status.canAdd){
        //  TODO i wanted to get the checks into a service
        // probably should wrap this in a try catch
        // send the friend request here
      }
    

  

      // const separatorIndex = data.indexOf("#");
      // const receiverName = data.substring(0, separatorIndex);
      // const receiverFriendId = data.substring(separatorIndex + 1);

      // if (separatorIndex === -1) {
      //   handleInvalidInput("Invalid input format: no '#' separator found");
      //   return;
      // }

      // if (receiverName === AppState.user?.username) {
      //   handleInvalidInput("Cannot Add Yourself");
      //   return;
      // }

      try {
        const receiverFriendRecord = await pb
          .collection(Collections.Friends)
          .getFirstListItem(`id = "${receiverFriendId}" `, { expand: "user" });
        const senderFriendRecord = await pb
          .collection(Collections.Friends)
          .getFirstListItem(`id = "${AppState.userFriendId}" `, {
            expand: "user",
          });
        const alreadyFriends = senderFriendRecord?.friends?.includes(
          receiverFriendRecord.expand.user.id
        );

        // console.log(senderFriendRecord.friends);

        const usernameMatchesFriendUserRecord =
          receiverFriendRecord?.expand?.user?.username === receiverName;

        if (receiverFriendRecord && usernameMatchesFriendUserRecord) {
          setValue("receiver", receiverFriendRecord.id);
          setIsValid(true);
          setFormError("");
          if (alreadyFriends) {
            handleInvalidInput("Already Friends");
          }
        } else {
          handleInvalidInput("Invalid Username or FriendId");
        }

        setLoading(false);
      } catch (error) {
        handleInvalidInput("An error occurred while validating receiver data");
        console.warn("An error occurred while validating receiver data", error);
      }
    }, 1000),
    []
  );

  const handleInvalidInput = (errorMessage: string) => {
    console.warn(errorMessage);
    setFormError(errorMessage);
    setLoading(false);
    setIsValid(false);
  };
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
          {formError !== "" && <div className="text-red-400">{formError}</div>}
          {isValid && (
            <div className="  flex items-center gap-x-2  p-2">
              <div className="text-green-400">✓</div>
              <div className="text-green-400">Valid</div>
            </div>
          )}
        </div>
        <hr className="border-gray-500" />
        <div className="">
          <div className="my-3 text-lg font-bold text-gray-200">
            MAKE FRIENDS BY JOINING SERVERS AND CONNECTING
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
