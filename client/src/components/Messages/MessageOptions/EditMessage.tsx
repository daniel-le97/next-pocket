/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */

import { observer } from "mobx-react";
import { BsEmojiSmile, BsXCircle } from "react-icons/bs";
import {
  MessagesRecord,
  MessagesResponse,
  ServersRecord,
} from "../../../../PocketBaseTypes/pocketbase-types";
import Pop from "../../../../utils/Pop";
import { messageService } from "../../../services/MessageService";

import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { FaEdit } from "react-icons/fa";
import { serversService } from "../../../services/ServersService";
import Loader from "../../Loader";
import { uploadService } from "../../../services/UploadService";
import { pb } from "../../../../utils/pocketBase";
import MessageCard from "../MessageCard";
import { AppState } from "../../../../AppState";
import { MessageWithUser } from "../../../../PocketBaseTypes/utils";
import TimeAgo from "timeago-react";
const EditMessage = ({ message }: { message: MessageWithUser }) => {
  return (
    <div className="group/item relative p-2 transition-all ease-linear hover:bg-zinc-600 ">
      <EditMessageModal message={message} />
      <span
        className="absolute  bottom-8  z-50  w-auto min-w-max origin-left scale-0 rounded-md
    bg-zinc-900 p-2 
    text-xs font-bold 
    text-white shadow-md transition-all duration-100
    group-hover/item:scale-100 "
      >
        Edit
      </span>
    </div>
  );
};

const user = pb.authStore.model;

const EditMessageModal = ({ message }: { message: MessageWithUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: message.text,
      user: message.user,
      channel: AppState.activeChannel?.id,
    },
  });
  const onSubmit = async (data: MessagesRecord) => {
    try {
    
      data.text += " (edited)";
      const updatedMessage = await messageService.editMessage(message.id, data);
      reset();

      setIsOpen(false);
    } catch (error) {
      console.error("Edit MMessage", error);
    }
  };

  return (
    <div className="  group ">
      <FaEdit
        size={22}
        onClick={() => {
          setIsOpen(true);
        }}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="  w-full max-w-screen-md rounded-md bg-zinc-900 p-2">
                  <Dialog.Title as="h3" className="dialog-title">
                    Edit Message {message.id}
                  </Dialog.Title>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="create-server-form"
                  >
                    <div className="rounded-sm bg-zinc-800">
                      <div className="message group">
                        <div className="relative m-0 ml-auto mb-auto flex w-12 flex-col items-center">
                          <img
                            className="mx-0  mb-auto mt-0 h-12 w-12  cursor-pointer rounded-full bg-gray-100 object-cover object-top shadow-md shadow-zinc-500 dark:shadow-zinc-800"
                            src={
                              message.expand?.user.avatarUrl ||
                              `https://api.dicebear.com/5.x/bottts-neutral/svg`
                            }
                            alt="avatar"
                            width="40px"
                          />
                          {/* <UserStatus user={message?.expand?.user} /> */}
                        </div>
                        <div className="ml-auto flex w-4/5 flex-col items-start">
                          <p className=" font-bold  text-red-500">
                            {message.expand?.user?.username}
                            <small className="ml-3 font-normal text-black dark:text-gray-300">
                              {
                                <TimeAgo
                                  datetime={message.created}
                                  locale={"en-US"}
                                  style={{ margin: 5 }}
                                />
                              }
                            </small>
                          </p>
                          <p className="text-lg font-semibold dark:text-gray-300">
                            <textarea
                              {...register("text", {
                                required: true,

                                minLength: 1,
                              })}
                              rows={4}
                              cols={50}
                              className="peer m-2 block min-h-[auto] w-full rounded border-0 bg-zinc-700/20  py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "
                            ></textarea>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className=" flex gap-x-2">
                      <button
                      type="button"
                        onClick={() => setIsOpen(false)}
                        className="rounded-md bg-purple-500 p-2 font-bold text-zinc-300 hover:bg-opacity-80"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-500 p-2 font-bold text-zinc-300 hover:bg-opacity-80"
                      >
                        Submit Edit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

const EditMessageCard = ({
  messages,
  message,
}: {
  messages: MessageWithUser[];
  message: MessageWithUser;
}) => {
  return (
    <div className="message group">
      <div className="relative m-0 ml-auto mb-auto flex w-12 flex-col items-center">
        <img
          className="mx-0  mb-auto mt-0 h-12 w-12  cursor-pointer rounded-full bg-gray-100 object-cover object-top shadow-md shadow-zinc-500 dark:shadow-zinc-800"
          src={
            message.expand?.user.avatarUrl ||
            `https://api.dicebear.com/5.x/bottts-neutral/svg`
          }
          alt="avatar"
          width="40px"
        />
        {/* <UserStatus user={message?.expand?.user} /> */}
      </div>
      <div className="ml-auto flex w-4/5 flex-col items-start">
        <p className=" font-bold  text-red-500">
          {message.expand?.user?.username}
          <small className="ml-3 font-normal text-black dark:text-gray-300">
            {
              <TimeAgo
                datetime={message.created}
                locale={"en-US"}
                style={{ margin: 5 }}
              />
            }
          </small>
        </p>
        <p className="text-lg font-semibold dark:text-gray-300">
          {message.text}
        </p>
      </div>
      <div className=" absolute bottom-20 right-0 mr-5  transition-all group-hover:opacity-0 "></div>
      <div className="absolute bottom-24 right-0  mr-5   opacity-0 group-hover:opacity-100">
        <div className=" flex gap-x-2 rounded  border-zinc-900 bg-zinc-700  shadow-sm transition-all hover:shadow-md hover:shadow-zinc-900">
          <div className="group/item relative ">
            <BsEmojiSmile
              size={22}
              onClick={() => {
                console.log(reaction);
                setReaction(!reaction);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// const MessageCard = ({
//   messages,
//   message,
// }: {
//   messages: MessageWithUser[];
//   message: MessageWithUser;
// }) => {
//   const [reaction, setReaction] = useState(false);
//   const messageQuery = AppState.messageQuery;

// };
export default observer(EditMessage);