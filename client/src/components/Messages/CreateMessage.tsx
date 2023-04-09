/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { AppState } from "../../../AppState";
import { messageService } from "../../services/MessagesService";
import type { MessagesRecord } from "../../../PocketBaseTypes/pocketbase-types";
import { useForm } from "react-hook-form";
import Pop from "../../../utils/Pop";
import MessagingGuidelines from "./MessagingGuidelines";
import {
  FaBold,
  FaFileImage,
  FaImage,
  FaItalic,
  FaStrikethrough,
} from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";
import MyModal from "../GlobalComponents/Modal";
import { uploadService } from "@/services";
const CreateMessage = () => {
  const [selectedText, setSelectedText] = useState("");
  const [selectionStart, setSelectionStart] = useState(-1);
  const [selectionEnd, setSelectionEnd] = useState(-1);
  const user = AppState.user;
  const [characterCount, setCharacterCount] = useState(0);
  const [messageAttachmentUrl, setMessageAttachmentUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      content: "",
      user: user!.id,
      channel: "",
      files: "",
      attachments: "",
    },
  });

  const sendMessage = async (data: MessagesRecord) => {
    try {
      const el = document.getElementById("createMessageInput");
      

     if (data.content) {
       const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))(?=[^\s]*\s)/g;
       data.content = data.content.replace(regex, "![$1]($1)");
     }

      data.channel = AppState.activeChannel?.id;
  
      console.log(data.content);

      // await messageService.sendMessage(data);
      // reset();

      el.style.height = "initial";

      setCharacterCount(0);
      setMessageAttachmentUrl("");
    } catch (error) {
      Pop.error(error);
    }
  };

  useEffect(() => {
    if (selectedText) {
      console.log(selectedText);
    }
  }, [selectedText]);

  const insertMarkdown = (before: string, after: string, value: string) => {
    if (selectionStart !== -1 && selectionEnd !== -1) {
      const prefix = value.substring(0, selectionStart);
      const selected = before + selectedText + after;
      const suffix = value.substring(selectionEnd);
      let newValue = prefix + selected + suffix;
      setSelectionStart(-1);
      setSelectionEnd(-1);
      const inputEl = document.getElementById(
        "createMessageInput"
      ) as HTMLInputElement;

      if (value.includes(before) && value.includes(after)) {
        newValue = prefix + selectedText + suffix;
      }

      inputEl.value = newValue;
      inputEl.setSelectionRange(
        prefix.length,
        prefix.length + selectedText.length
      );
      return newValue;
    }
  };

  const handleInsertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      const newValue =
        value.substring(0, selectionStart) +
        `![${selectedText}](${url})` +
        value.substring(selectionEnd);
      setSelectionStart(-1);
      setSelectionEnd(-1);

      const inputEl = document.getElementById(
        "createMessageInput"
      ) as HTMLInputElement;
      inputEl.value = newValue;
      return newValue;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = async () => {
      // const file = Array.from(event.target.files)[0];
      const inputEl = document.getElementById(
        "createMessageInput"
      ) as HTMLInputElement;
      const record = await uploadService.uploadMessageAttachment(
        event.target.files
      );
      setImageUrl(record!.url);
      // setValue("imageUrl", record?.url);
      const id = record?.id;
      setValue("attachments", id!);
      setMessageAttachmentUrl(record?.url!);

      inputEl.value = inputEl.value + `![${record?.name}](${record?.url})`;
    };
    uploadFile();
  };
  return (
    <div className=" absolute  bottom-2  max-h-full w-full  bg-white   pt-10  dark:border-white/20 dark:bg-gray-800 md:border-t-0 md:border-transparent md:!bg-transparent ">
      <form
        onSubmit={handleSubmit(sendMessage)}
        className="relative mx-4  flex"
      >
        {AppState.activeChannel ? (
          <>
            <textarea
              id="createMessageInput"
              rows={1}
              className="create-message-input h-auto max-h-96 w-full resize-none  rounded-xl  bg-gray-100 py-3.5 pl-4 pr-12 text-lg font-semibold text-gray-500  focus:outline-none dark:bg-zinc-600/90 dark:text-zinc-300"
              {...register("content", {
                required: true,
                maxLength: 2400,
                minLength: 3,
              })}
              onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                setCharacterCount(e.currentTarget.value.length);

                if (characterCount >= 2400) {
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
            <div className="absolute bottom-[3.75rem]  right-24 pb-1 pr-2 text-sm">
              <Tooltip content="Upload image" color="invert" placement="top">
                <FaFileImage size={18} className="text-gray-300" />
                <input
                  type="file"
                  accept="image/*"
                  style={{ opacity: 0, position: "absolute", top: 0, left: 0 }}
                  onChange={handleFileChange}
                />
              </Tooltip>
            </div>
            {selectedText && (
              <div className="absolute bottom-14  my-2 flex justify-center space-x-4 rounded bg-zinc-900 p-2 text-gray-300">
                <button
                  type="button"
                  onClick={() => insertMarkdown("**", "**", selectedText)}
                >
                  <Tooltip content="Bold" color="invert" placement="top">
                    <FaBold />
                  </Tooltip>
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("*", "*", selectedText)}
                >
                  <Tooltip content="Italic" color="invert" placement="top">
                    <FaItalic />
                  </Tooltip>
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("~~", "~~", selectedText)}
                >
                  <Tooltip
                    content="StrikeThrough"
                    color="invert"
                    placement="top"
                  >
                    <FaStrikethrough />
                  </Tooltip>
                </button>
                <button type="button" onClick={handleInsertImage}>
                  <Tooltip content="Image" color="invert" placement="top">
                    <FaImage />
                  </Tooltip>
                </button>
              </div>
            )}
            {messageAttachmentUrl && (
              <div className="absolute bottom-14  my-2 flex justify-center space-x-4 rounded bg-zinc-900 p-2 text-gray-300">
                <img
                  src={messageAttachmentUrl}
                  alt=""
                  className=" h-44 w-44 rounded border-2 border-zinc-900 object-cover"
                />
              </div>
            )}
            <div className="absolute bottom-[3.75rem] right-[4.5rem] pb-1 pr-2  text-sm">
              <MessagingGuidelines />
            </div>
            <div
              id="charLimit"
              className={` absolute bottom-[3.75rem] right-2 text-sm  ${
                characterCount <= 2400 ? "text-zinc-300" : "text-red-400"
              }`}
            >
              {characterCount}/2400
            </div>
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
      </form>
    </div>
  );
};

export default observer(CreateMessage);
