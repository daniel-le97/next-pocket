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
const ServerGuidelines = () => {
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
    <button className=" server-options-selection">
      <MyModal
        buttonIcon={
          <div className="flex w-full  justify-between">
            Server Guidelines
            <FaPlusCircle size={18} />
          </div>
        }
        title="Server Guidelines"
      >
        <div className=" p-2 text-white">
          <ul className=" list-decimal">
            <li>
              Respect others: Treat other users with respect and refrain from
              using offensive language, hate speech, or any form of harassment
              or discrimination.
            </li>
            <li>
              Stay on topic: Keep conversations relevant to the chat's purpose
              and refrain from discussing inappropriate or off-topic subjects.
            </li>
            <li>
              No spamming: Do not flood the chat with repetitive messages or
              advertising, as this disrupts the flow of conversation.
            </li>
            <li>
              No trolling: Do not intentionally disrupt the chat or provoke
              others with the intention of causing harm or annoyance.
            </li>
            <li>
              Keep it legal: Do not engage in any illegal activities or discuss
              any illegal topics, as this could result in consequences for the
              chat and its users.
            </li>
            <li>
              Follow instructions: Follow the guidelines and instructions set by
              the chat moderators and administrators.
            </li>
            <li>
              No personal information: Do not share personal information, such
              as phone numbers, addresses, or passwords, in the chat.
            </li>
            <li>
              Keep it clean: Refrain from posting any explicit or inappropriate
              content that may be offensive or harmful to others.
            </li>
            <li>
              Use appropriate language: Use appropriate language and avoid
              excessive use of profanity or vulgar language.
            </li>
            <li>
              Report inappropriate behavior: If you witness any inappropriate
              behavior or content in the chat, report it to the moderators or
              administrators immediately.
            </li>
          </ul>
        </div>
      </MyModal>
    </button>
  );
};

export default observer(ServerGuidelines);
