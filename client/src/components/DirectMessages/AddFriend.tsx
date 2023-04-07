/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { friendRequestService } from "@/services/FriendRequestsService";
import { observer } from "mobx-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppState } from "../../../AppState";
import {
  Collections,
  UsersResponse,
} from "../../../PocketBaseTypes";
import Pop from "../../../utils/Pop";
import { friendsService, usersService } from "../../services";
import { pb } from "~/utils/pocketBase";
import { log } from "console";
import { debounce } from "lodash";
import Loader from "../GlobalComponents/Loader";
import { Tooltip } from "@nextui-org/react";
import { FaChevronRight, FaCompass, FaQuestionCircle } from "react-icons/fa";
import Link from "next/link";

const AddFriend = () => {
  // const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // useEffect(() => {
  //   if (formValue !== "") {
  //     validateReceiverData(formValue);
  //   }
  //   setFormError("");
  // }, [formValue]);

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
      receiver: "",
      receiverData: ""
    },
  });

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    await validateReceiverData(value);
  };

  const onSubmit = async (data: {receiver: string, receiverData: string}) => {
    try {
      if (isValid) {
        console.log('data', data);
    
        // console.log(isValid, data);
        const res = await friendsService.create(data.receiver)
        if (res) {
          reset();
          // setFormValue("");
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
      try {
        setLoading(true);
        const status = await usersService.checkIfUserCanAddFriend(data)
        // if there was an error, handle it
        if (status.error) return handleInvalidInput(status.error);
        setValue("receiver", status.userId!)
        setIsValid(true);
        setLoading(false);
        } catch (error) {
          Pop.error(error)
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
              onChange={(e) => handleChange(e)}
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
