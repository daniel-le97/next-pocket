/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */

import { observer } from "mobx-react";
import { BsEmojiSmile } from "react-icons/bs";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaEdit } from "react-icons/fa";
import TimeAgo from "timeago-react";
import { directMessageService, messageService } from "@/services";
import type { DirectMessagesRecord, IBaseMessage, MessagesRecord, MessageWithUser } from "PocketBaseTypes";
import { AppState } from "AppState";
import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";

const EditMessage = ({ message }: { message: IBaseMessage }) => {
  return (
    <div className="message-options-icon  group/item">
      <Tooltip content="Edit" placement="top" color="invert">
        <EditMessageModal message={message} />
      </Tooltip>
    </div>
  );
};



const EditMessageModal = ({ message }: { message: IBaseMessage}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isDmPath = router.pathname.includes("DirectMessages");

  const checkIfEdited = (data: IBaseMessage) => {
    if(data.content?.includes(" *(edited)*")) return
    data.content += " *(edited)*";
  }

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      content: message.content?.replace(" *(edited)*", ""),
      user: message.user.id,
    },
  });
  const onSubmit: SubmitHandler<{
    content: string | undefined;
    user: string;
  }> = async (
    data
  ) => {
    try {
      checkIfEdited(data as unknown as IBaseMessage);
      if (isDmPath) {
        await directMessageService.updateDirectMessage(
          message.id,
          data as unknown as DirectMessagesRecord
        );
      } else {
      }
      await messageService.editMessage(
        message.id,
        data as unknown as MessagesRecord
      );

      setIsOpen(false);
    } catch (error) {
      console.error("Edit Message", error);
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
                        <div className="relative m-0 mb-auto ml-auto flex w-12 flex-col items-center">
                          <img
                            className="mx-0  mb-auto mt-0 h-12 w-12  cursor-pointer rounded-full bg-gray-100 object-cover object-top shadow-md shadow-zinc-500 dark:shadow-zinc-800"
                            src={
                              message.user.avatarUrl ||
                              `https://api.dicebear.com/5.x/bottts-neutral/svg`
                            }
                            alt="avatar"
                            width="40px"
                          />
                          {/* <UserStatus user={message?.expand?.user} /> */}
                        </div>
                        <div className="ml-auto flex w-4/5 flex-col items-start">
                          <p className=" font-bold  text-red-500">
                            {message.user?.username}
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
                              {...register("content", {
                                required: true,

                                minLength: 1,
                              })}
                              rows={4}
                              cols={50}
                              className="peer m-2 block min-h-[auto] w-full rounded border-0 bg-zinc-700/20  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "
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



export default observer(EditMessage);
