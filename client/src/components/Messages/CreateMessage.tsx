/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from "react";
import { observer } from "mobx-react";
// import { BsPlusCircleFill } from "react-icons/bs";
import { AppState } from "../../../AppState";
import { messageService } from "../../services/MessagesService";
import type { MessagesRecord } from "../../../PocketBaseTypes/pocketbase-types";
import { useForm } from "react-hook-form";
import Pop from "../../../utils/Pop";
const CreateMessage = () => {
  // const [newMessage, setNewMessage] = useState("");
  // const messages = AppState.messages;
  const user = AppState.user;
  const [characterCount, setCharacterCount] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      content: "",
      user: user!.id,
      channel: "",
    },
  });

  const sendMessage = async (data: MessagesRecord) => {
    try {
      const el = document.getElementById("createMessageInput");

      data.channel = AppState.activeChannel?.id;
      await messageService.sendMessage(data);
      reset();
      if (el) {
        el.style.height = "initial";
      }
      setCharacterCount(0);
    } catch (error) {
      Pop.error(error);
    }

    // const createdMessage = await pb.collection("messages").create(data);
    // setNewMessage("");
  };

  return (
    <div className=" absolute  bottom-2  max-h-full w-full  bg-white   pt-10  dark:border-white/20 dark:bg-gray-800 md:border-t-0 md:border-transparent md:!bg-transparent ">
      <form
        onSubmit={handleSubmit(sendMessage)}
        className="relative mx-4  flex"
      >
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
              id="createMessageInput"
              rows={1}
              className="create-message-input max-h-96 w-full resize-none  rounded-xl  bg-gray-700 py-3.5 pl-4 pr-12 text-lg  font-semibold text-zinc-300 focus:outline-none"
              {...register("content", {
                required: true,
                maxLength: 1200,
                minLength: 3,
              })}
              onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                setCharacterCount(e.currentTarget.value.length);
                //  const limitEl = document.getElementById("charLimit");
                //  limitEl.textContent = `${charCount}/600`;
                if (characterCount >= 1200) {
                  e.preventDefault();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                handleSubmit(sendMessage)()
                }
              }}
            ></textarea>
            <p
              id="charLimit"
              className={` absolute bottom-14 right-2 text-sm  ${
                characterCount <= 1200 ? "text-zinc-300" : "text-red-400"
              }`}
            >
              {characterCount}/1200
            </p>
            <button
              type="submit"
              className="btn-primary absolute bottom-2 right-2 "
            >
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
// const PlusIcon = () => (
//   <button type="submit">
//     <BsPlusCircleFill
//       size="22"
//       className="dark:text-primary mx-2 text-green-500 dark:shadow-lg"
//     />
//   </button>
// );

export default observer(CreateMessage);
