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
const CreateMessage = () => {
  const [newMessage, setNewMessage] = useState("");
  const messages = AppState.messages;
  const sendMessage = async (event: { preventDefault: () => void }) => {
    // event.preventDefault();

    if (containsUrl(newMessage)) {
      console.log("URL found!");
    } else {
      console.log("No URL found.");
    }

    const user = AppState.user;
    const data: MessagesRecord = {
      text: newMessage,
      user: user!.id,
      channel: AppState?.activeChannel?.id,
    };

    // const createdMessage = await pb.collection("messages").create(data);
    const createMessage = await messageService.sendMessage(data);
    setNewMessage("");
  };


  return (
    <div className="create-message-bar w-full  absolute bottom-0  pt-10   bg-white  dark:border-white/20 dark:bg-gray-800 md:border-t-0 md:border-transparent md:!bg-transparent ">
      <form onSubmit={sendMessage} className="flex">
        {AppState.activeChannel ? (
          <>
            <InputEmoji
              value={newMessage}
              onChange={setNewMessage}
              cleanOnEnter
              onEnter={sendMessage}
              placeholder="Enter message..."
            
            />
            <PlusIcon />
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
