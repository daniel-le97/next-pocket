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
const CreateChannel = () => {
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
      const welcomeMessage  = {
        channel: newChannel.id,
        content: "Welcome to the channel",
        user: AppState.user?.id,
        attachments:''
      };
   const defaultWelcomeMessage =   await messageService.sendMessage(welcomeMessage,"");

      reset();

      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button className=" server-options-selection">
      <MyModal
        buttonIcon={
          <div className="flex w-full  justify-between">
            Create Channel
            <FaPlusCircle size={20} />
          </div>
        }
        title="Create Channel"
      >
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
      </MyModal>
    </button>
  );
};

export default observer(CreateChannel);
