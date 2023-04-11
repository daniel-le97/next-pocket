import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { pb } from "../../../utils/pocketBase";
import { BsPlusCircleFill } from "react-icons/bs";
import { AppState } from "../../../AppState";
import { FaBold, FaImage, FaItalic, FaLaugh, FaSmile, FaStrikethrough } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import InputEmoji from "react-input-emoji";
import { useRouter } from "next/router";
import Pop from "~/utils/Pop";
import { useForm } from "react-hook-form";
import { DirectMessagesRecord } from "~/PocketBaseTypes";
import { directMessageService } from "@/services";
const CreateDirectMessage = () => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const [characterCount, setCharacterCount] = useState(0);
  const [friendRecordId, setFriendRecordId] = useState("");


  const [selectedText, setSelectedText] = useState("");
  const [selectionStart, setSelectionStart] = useState(-1);
  const [selectionEnd, setSelectionEnd] = useState(-1);
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      content: "",
      sender: AppState.user?.id,
      files: "",
      friendRecord: AppState.dmRouterQuery,
    },
  });

  // useEffect(() => {
  //   if (AppState.dmRouterQuery) {
  //     setFriendRecordId(AppState.dmRouterQuery);
  //   }
  // }, [AppState.dmRouterQuery]);

  const sendMessage = async (data: DirectMessagesRecord) => {
    try {
      setValue("friendRecord", AppState.dmRouterQuery);

      console.log(data);

      await directMessageService.createDirectMessage(data);
      setValue("content", "");
      // setValue("friendRecord", router.query.id!.toString());
    } catch (error) {
      Pop.error(error);
    }
  };

  return (
    <div className=" absolute  bottom-2  max-h-full w-full  bg-white   pt-10  dark:border-white/20 dark:bg-gray-800 md:border-t-0 md:border-transparent md:!bg-transparent ">
      <form
        onSubmit={handleSubmit(sendMessage)}
        className="relative mx-4  flex"
      >
        <textarea
          id="createMessageInput"
          rows={1}
          className="create-message-input max-h-96 w-full resize-none  rounded-xl  bg-gray-100 py-3.5 pl-4 pr-12 text-lg font-semibold text-gray-500  focus:outline-none dark:bg-zinc-600/90 dark:text-zinc-300"
          {...register("content", {
            required: true,
            maxLength: 1200,
            minLength: 1,
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
              handleSubmit(sendMessage)();
            }
          }}
          onSelect={(e) => {
            const selectedValue = e.target.value.slice(
              e.target.selectionStart,
              e.target.selectionEnd
            );
            setSelectedText(selectedValue);
            setSelectionStart(e.target.selectionStart);
            setSelectionEnd(e.target.selectionEnd);
          }}
        ></textarea>

        {/* <div className="my-2 flex justify-center space-x-2">
          <button onClick={() => insertMarkdown("**", "**")}>
            <FaBold />
          </button>
          <button onClick={() => insertMarkdown("*", "*")}>
            <FaItalic />
          </button>
          <button onClick={() => insertMarkdown("~~", "~~")}>
            <FaStrikethrough />
          </button>
          <button onClick={handleInsertImage}>
            <FaImage />
          </button>
        </div> */}
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
      </form>
    </div>
  );
};

export default observer(CreateDirectMessage);
