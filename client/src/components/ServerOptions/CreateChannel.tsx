import { AppState } from "AppState";
import { observer } from "mobx-react";
import { Bs0CircleFill, BsPlusCircleFill } from "react-icons/bs";
import { FaPlusCircle, FaUserMinus } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import router from "next/router";
import { serversService } from "@/services/ServersService";
import MyModal from "../GlobalComponents/Modal";
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
  const onSubmit = async (data: ServersRecord) => {
    try {
      const newServer = await serversService.createServer(data);
      reset();

      setIsOpen(false);
      router.push(`http://localhost:3000/server/${newServer.id}`);
    } catch (error) {
      console.error("createServer", error);
    }
  };
  return (
  

    <button className=" server-options">
      <MyModal
        buttonIcon={
          <div className="flex w-full  justify-between">
            Create Channel
            <FaPlusCircle size={18} />
          </div>
        }
        title="Create Channel"
      >
        <form onSubmit={handleSubmit(onsubmit)}>
          <input
            className=" ml-0 mr-auto bg-zinc-800 p-2 rounded-md w-full  cursor-text bg-transparent font-semibold text-gray-500 placeholder-gray-500 outline-none focus:w-full"
            type="text"
            placeholder="Enter Title"
            {...register("title", {
              required: true,
              minLength: 5,
              maxLength: 30,
            })}
          />

          <button  type="submit">
            Submit
          </button>
        </form>
      </MyModal>
    </button>
  );
};

export default observer(CreateChannel);
