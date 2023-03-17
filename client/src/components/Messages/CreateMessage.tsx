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

    const user = pb.authStore.model;
    const data = {
      text: newMessage,
      user: user?.id,
      channel: AppState?.activeChannel?.id,
      // // @ts-ignore
      // room: AppState?.activeRoom?.id,
    };

    // const createdMessage = await pb.collection("messages").create(data);
    const createMessage = await messageService.sendMessage(data)
    setNewMessage("");
  };

  return (
    <div className="bottom-bar">
      <form onSubmit={sendMessage} className="flex w-3/4">
        {AppState.activeChannel ? (
          <>
          
            <InputEmoji
              value={newMessage}
              onChange={setNewMessage}
              cleanOnEnter
              onEnter={sendMessage}
              placeholder="Enter message..."
              className="bottom-bar-input  "
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

function containsUrl(text: string) {
  // Create a regular expression to match URLs
  const urlRegex =
    /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;

  // Use the `test` method to check if a URL exists within the text
  return urlRegex.test(text);
}

export default observer(CreateMessage);
