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
import { FaBold, FaImage, FaItalic, FaStrikethrough } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";
const CreateMessage = () => {
  const [selectedText, setSelectedText] = useState("");
  const [selectionStart, setSelectionStart] = useState(-1);
  const [selectionEnd, setSelectionEnd] = useState(-1);
  const user = AppState.user;
  const [characterCount, setCharacterCount] = useState(0);
  const { register, handleSubmit, reset } = useForm({
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
      setValue((value) => {
        const newValue =
          value.substring(0, selectionStart) +
          `![${selectedText}](${url})` +
          value.substring(selectionEnd);
        setSelectionStart(-1);
        setSelectionEnd(-1);
        return newValue;
      });
    }
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
              className="create-message-input max-h-96 w-full resize-none  rounded-xl  bg-gray-100 py-3.5 pl-4 pr-12 text-lg font-semibold text-gray-500  focus:outline-none dark:bg-zinc-600/90 dark:text-zinc-300"
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
            <p className="absolute bottom-14 right-12 text-sm">
              <MessagingGuidelines />
            </p>
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
      </form>
    </div>
  );
};

export default observer(CreateMessage);
