/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { observer } from "mobx-react";
import type { ChangeEvent, FormEventHandler} from "react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Pop from "../../../utils/Pop";
import { friendsService, usersService } from "../../services";
import { debounce } from "lodash";
import Loader from "../GlobalComponents/Loader";
import { Tooltip } from "@nextui-org/react";
import { FaChevronRight, FaCompass, FaQuestionCircle } from "react-icons/fa";
import Link from "next/link";

const AddFriend = () => {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
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
      //  const res = console.log(data); 
        const res = await friendsService.create(data.receiver)
        if (res) {
          reset();
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
  const addFriendMessage = "You can add a friend with their username and friendId. It's cAsE sEnSiTiVe"
  return (
    <>
      <div className="rounded-md  p-5">
        <div className=" text-lg font-bold dark:text-zinc-200">Add Friend</div>
        <div className=" dark:text-zinc-400">
          {addFriendMessage}
          <br />
          beepo#7pav16sqx77dapf
        </div>
        <div className="relative flex flex-col py-4">
          <Tooltip
            placement="bottom"
            color="invert"
            content={<strong> Example: TungusTheFungus#d1xf11e03i3mio2</strong>}
          >
            <FaQuestionCircle size={25} className="dark:text-gray-300" />
          </Tooltip>
          <form
            onSubmit={handleSubmit(onSubmit) as unknown as FormEventHandler}
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
              onChange={(e) => handleChange(e) as unknown as void}
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
          <div className="my-3 text-lg font-bold dark:text-gray-200">
            MAKE FRIENDS BY JOINING SERVERS AND CONNECTING
          </div>
          <Link href={"/"}>
            <div className="flex w-1/2  items-center justify-between rounded border border-gray-500 bg-zinc-800/40 py-2 px-4 hover:bg-zinc-500">
              <div className="flex items-center gap-x-2 dark:text-gray-300">
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
