/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */

import { observer } from "mobx-react";
import { BsEmojiSmile, BsXCircle } from "react-icons/bs";
import { MessagesResponse, ServersRecord } from "../../../../PocketBaseTypes/pocketbase-types";
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
const EditMessage = ({message}:{message:MessageWithUser}) => {
  const editMessage = async () => {
    try {
      const yes = await Pop.confirm();
      if (!yes) {
        return;
      }
      await messageService.editMessage(message.id);
    } catch (error) {
      Pop.error(error);
    }
  };
  return (
    <div className="group/item hover:bg-zinc-600 relative p-1 transition-all ease-linear ">
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
const data = {
  name: "test",
  description: "test",
  members: ["RELATION_RECORD_ID"],
  imageUrl: "test",
  imageFile: null,
};
const initialFormData = {
  name: "",
  description: "",
  members: [user?.id],
  imageUrl: "",
  // imageFile: null,
};
const EditMessageModal = ({message}:{message:MessageWithUser}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      members: [user?.id],
      // imageUrl: "",
      owner: user?.id,
      description: "",
    },
  });
  const onSubmit = async (data: ServersRecord) => {
    try {
      const newServer = await serversService.createServer(data);
      reset();
      setImageUrl("");
      closeModal();
      router.push(`http://localhost:3000/server/${newServer.id}`);
    } catch (error) {
      console.error("createServer", error);

      await uploadService.deleteFile(user!.id, data.image!);
    }
  };

 
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="  group ">
      <FaEdit size={22} onClick={openModal} />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                            {message.text}
                            <input
                              {...register("text", {
                                required: true,
                             
                                minLength: 1,
                              })}
                              type="text"
                              className="  bg-zinc-600/40 p-1 m-1 rounded-md "
                            />
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
                    </div>


                    <div className="">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
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
      <div className=" absolute bottom-20 right-0 mr-5  transition-all group-hover:opacity-0 ">
     
      </div>
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
}




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
