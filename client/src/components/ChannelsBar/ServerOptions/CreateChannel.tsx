import { AppState } from "AppState";
import { observer } from "mobx-react";
import { Bs0CircleFill, BsPlusCircleFill } from "react-icons/bs";
import {
  FaChevronDown,
  FaHashtag,
  FaPlusCircle,
  FaPoundSign,
  FaUserMinus,
} from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import router from "next/router";
import { serversService } from "@/services/ServersService";
import MyModal from "../../GlobalComponents/Modal";
import { channelsService, messageService } from "@/services";
import { ChannelsRecord } from "~/PocketBaseTypes";
const CreateChannel = ({ toggleOpen }) => {
  const [closeModal, setCloseModal] = useState(false);
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
      members: [],
      messages: [],

      title: "",
      server: AppState.activeServer?.id,
    },
  });
  const onSubmit = async (data: ChannelsRecord) => {
    try {
      const newChannel = await channelsService.createChannel(data);
      await messageService.getMessagesByChannelId(newChannel?.id!);
      setIsOpen(false);
      toggleOpen();
      // const welcomeMessage = {
      //   channel: newChannel.id,
      //   content: "Welcome to the channel",
      //   user: AppState.user?.id,
      //   attachments: "",
      // };
      //  const defaultWelcomeMessage =   await messageService.sendMessage(welcomeMessage,"");

      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/* <div className="flex items-center justify-center">
        <Tooltip content="Create Server" placement="right" color="invert">
          <BsPlusCircleFill size={28} />
        </Tooltip>
      </div> */}

      <button
        className=" server-options-selection"
        onClick={() => {
          setIsOpen(true);
          toggleOpen();
        }}
      >
        <div className="flex w-full  justify-between">
          Create Channel
          <FaPlusCircle size={20} />
        </div>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
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
                <Dialog.Panel className="dialog-modal">
                  <Dialog.Title as="h3" className="dialog-title">
                    Create Channel
                  </Dialog.Title>

                  <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                      <div className="relative">
                        <input
                          className=" my-2 pl-8  "
                          type="text"
                          placeholder="new-channel"
                          {...register("title", {
                            required: true,
                            minLength: 1,
                            maxLength: 50,
                          })}
                        />
                        <FaHashtag
                          size="20"
                          className="title-hashtag absolute top-[1.2rem]"
                        />
                      </div>

                      <button className="btn-primary" type="submit">
                        Submit
                      </button>
                    </form>
                    ;
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* <MyModal
          buttonIcon={
            <div className="flex w-full  justify-between">
              Create Channel
              <FaPlusCircle size={20} />
            </div>
          }
          title="Create Channel"
        ></MyModal> */}
    </>
  );
};
//  <form onSubmit={handleSubmit(onSubmit)} className="">
//    <div className="relative">
//      <input
//        className=" my-2 pl-8  "
//        type="text"
//        placeholder="new-channel"
//        {...register("title", {
//          required: true,
//          minLength: 1,
//          maxLength: 50,
//        })}
//      />
//      <FaHashtag size="20" className="title-hashtag absolute top-[1.2rem]" />
//    </div>

//    <button className="btn-primary" type="submit">
//      Submit
//    </button>
//  </form>;
export default observer(CreateChannel);
