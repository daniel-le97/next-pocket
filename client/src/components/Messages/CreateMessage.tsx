/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from "react";
import { observer } from "mobx-react";
import { pb } from "../../../utils/pocketBase";
import { BsPlusCircleFill } from "react-icons/bs";
import { AppState } from "../../../AppState";
import { FaLaugh, FaSmile } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import InputEmoji from "react-input-emoji";
import React from "react";
import { messageService } from "../../services/MessageService";
import { containsUrl } from "../../../utils/ContainsUrl";
import type { MessagesRecord } from "../../../PocketBaseTypes/pocketbase-types";
import { useForm } from "react-hook-form";
import Pop from "../../../utils/Pop";
import ReactMarkdown from "react-markdown";
const CreateMessage = () => {
  const [newMessage, setNewMessage] = useState("");
  const messages = AppState.messages;
  const user = AppState.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      content: "",
      user: user!.id,
      channel: "",
    },
  });

  const sendMessage = async (data: MessagesRecord) => {
    try {
      data.channel = AppState.activeChannel?.id;
      const createMessage = await messageService.sendMessage(data);
      reset()
    } catch (error) {
      Pop.error(error);
    }

    // const createdMessage = await pb.collection("messages").create(data);
    // setNewMessage("");
  };

  return (
    <div className="create-message-bar absolute  bottom-0 w-full  bg-white   pt-10  dark:border-white/20 dark:bg-gray-800 md:border-t-0 md:border-transparent md:!bg-transparent ">
      <form onSubmit={handleSubmit(sendMessage)} className="flex">
       
        {AppState.activeChannel ? (
          <>
            {/* <InputEmoji
              value={newMessage}
              // onChange={setNewMessage}
              cleanOnEnter
              // onEnter={sendMessage}
              placeholder="Enter message..."
            
            />
            <PlusIcon /> */}

            <textarea
              className="rounded-full border-2 border-zinc-900 bg-transparent p-2 focus:outline-none"
              rows={2}
              cols={100}
              {...register("content", {
                required: true,
                maxLength: 20000,
                minLength: 3,
              })}
            ></textarea>
            <button type="submit" className="p-1">
              {" "}
              Submit
            </button>
          </>
        ) : (
          <div className=""></div>
        )}
        {/* <button type="submit">submite</button> */}
        {/* <input
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Enter message..."
          className="bottom-bar-input"
          
        /> */}
      </form>

      <div className="flex items-center justify-evenly">
        {/* <EmojiPicker  text={newMessage} setText={setNewMessage}  /> */}
      </div>
    </div>
  );
};
const PlusIcon = () => (
  <button type="submit">
    <BsPlusCircleFill
      size="22"
      className="dark:text-primary mx-2 text-green-500 dark:shadow-lg"
    />
  </button>
);

export default observer(CreateMessage);
