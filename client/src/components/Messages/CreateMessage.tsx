/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { AppState } from "../../../AppState";
import { messageService } from "../../services/MessagesService";
import DOMPurify from "dompurify";
import type {
  MessageAttachmentsRecord,
  MessagesRecord,
} from "../../../PocketBaseTypes/pocketbase-types";
import { useForm } from "react-hook-form";
import Pop from "../../../utils/Pop";
import MessagingGuidelines from "./MessagingGuidelines";
import {
  FaBold,
  FaFileImage,
  FaItalic,
  FaMinusCircle,
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
  const [messageAttachmentUrls, setMessageAttachmentUrls] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [messageAttachmentRecords, setMessageAttachmentRecords] = useState<
    MessageAttachmentsRecord[]
  >([]);
  // const inputRef = useRef<HTMLTextAreaElement>(null);
  // const inputEl = document.getElementById(
  //   "createMessageInput"
  // ) as HTMLInputElement;
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      content: "",
      user: user!.id,
      channel: "",

      attachments: "",
    },
  });

  const sendMessage = async (data: MessagesRecord) => {
    try {
     
      const inputEl = document.getElementById(
        "createMessageInput"
      ) as HTMLInputElement;

      function sanitizeUserInput(input) {
        const sanitized = DOMPurify.sanitize(input);
        return sanitized;
      }

      if (data.content) {
        const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))(?=[^\s]*\s)/g;
        data.content = data.content.replace(regex, "![$1]($1)");
        data.content = sanitizeUserInput(data.content);
      }

      data.channel = AppState.activeChannel?.id;

      console.log(data.content);

      await messageService.sendMessage(data, messageAttachmentRecords);
      reset();

      inputEl.style.height = "initial";

      setCharacterCount(0);
      setMessageAttachmentUrls([]);
      setMessageAttachmentRecords([]);
    } catch (error) {
      Pop.error(error);
    }
  };

  useEffect(() => {
    if (selectedText) {
      console.log(selectedText);
    }
  }, [selectedText]);

  // useEffect(() => {
  //   const inputEl = document.getElementById(
  //     "createMessageInput"
  //   ) as HTMLInputElement;

  //   if (!inputEl) {
  //     return;
  //   }

  //   const handleInputChange = (e: Event) => {
  //     const input = e.target as HTMLInputElement;
  //     console.log("Input value changed: ", input.value);
  //     // Do something with the input value...

  //     e.currentTarget.style.height = "auto";
  //     e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  //     const currentCharacterCount = e.currentTarget.value.length;
  //     setCharacterCount(currentCharacterCount);

  //     if (currentCharacterCount >= 2400) {
  //       e.preventDefault();
  //     }
  //     const containsScriptTag = /<script\b[^>]*>([\s\S]*?)<\/script>/gm.test(
  //       input.value
  //     );

  //     if (containsScriptTag) {
  //       input.value = input.value.replace(
  //         /<script\b[^>]*>([\s\S]*?)<\/script>/gm,
  //         ""
  //       );
  //     }
  //   };

  //   inputEl.addEventListener("input", handleInputChange);

  //   return () => {
  //     inputEl.removeEventListener("input", handleInputChange);
  //   };
  // }, []);

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

  // const handleInsertImage = () => {
  //   const url = prompt("Enter image URL:");
  //   if (url) {
  //     const newValue =
  //       value.substring(0, selectionStart) +
  //       `![${selectedText}](${url})` +
  //       value.substring(selectionEnd);
  //     setSelectionStart(-1);
  //     setSelectionEnd(-1);

  //     const inputEl = document.getElementById(
  //       "createMessageInput"
  //     ) as HTMLInputElement;
  //     inputEl.value = newValue;
  //     return newValue;
  //   }
  // };
  const deleteMessageAttachment = async (id: string) => {
    try {
      await uploadService.deleteFile(AppState?.user?.id!, id);
      // await uploadService.deleteMessageAttachment(messageAttachmentRecord.id);
      setMessageAttachmentUrls([]);
      setMessageAttachmentRecords([]);
      setValue("attachments", "");
      // inputEl.value = inputEl.value.replace(
      //   `![${messageAttachmentRecord.name}](${messageAttachmentRecord.url})`,
      //   ""
      // );
    } catch (error) {
      Pop.error(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = async () => {
      const inputEl = document.getElementById(
        "createMessageInput"
      ) as HTMLInputElement;
      // const record = await uploadService.uploadMessageAttachment(
      //   e.target.files
      // );

      const record = await uploadService.uploadFile(e.target.files);
      // setImageUrl(record!.url);
      // setValue("imageUrl", record?.url);
      const id = record?.id;
      setValue("attachments", id!);
      setMessageAttachmentUrls([...messageAttachmentUrls, record?.url!]);
      setMessageAttachmentRecords([...messageAttachmentRecords, record]);
      inputEl.value = inputEl.value + `![${record?.name}](${record?.url})`;
    };
    uploadFile();
  };
  return (
    <div className=" absolute  bottom-2  max-h-full w-full     ">
      <form
        onSubmit={handleSubmit(sendMessage)}
        className="relative mx-4  flex"
      >
        {AppState.activeChannel ? (
          <>
            <textarea
              id="createMessageInput"
              rows={1}
              className="create-message-input h-auto max-h-96 w-full resize-none  rounded-xl  bg-gray-100 py-3.5 pl-4 pr-12 text-lg font-semibold text-gray-500  focus:outline-none dark:bg-zinc-600 dark:text-zinc-300"
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

                const containsScriptTag =
                  /<script\b[^>]*>([\s\S]*?)<\/script>/gm.test(e.target.value);
                if (containsScriptTag) {
                  e.target.value = e.target.value.replace(
                    /<script\b[^>]*>([\s\S]*?)<\/script>/gm,
                    ""
                  );
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(sendMessage)();
                }
              }}
              onSelect={(e) => {
                const inputElement = e.target as HTMLInputElement;
                const selectedValue = inputElement.value.slice(
                  inputElement?.selectionStart!,
                  inputElement?.selectionEnd!
                );
                setSelectedText(selectedValue);
                setSelectionStart(inputElement?.selectionStart!);
                setSelectionEnd(inputElement?.selectionEnd!);
              }}
            ></textarea>
            <TextFormattingToolbar
              selectedText={selectedText}
              insertMarkdown={insertMarkdown}
            />

            <MessageAttachment
              messageAttachmentRecords={messageAttachmentRecords}
              deleteMessageAttachment={deleteMessageAttachment}
            />

            <div className="absolute bottom-[3.75rem] right-2 ">
              <div className="flex items-center justify-center space-x-3">
                <div className="  ">
                  <Tooltip
                    content="Upload image"
                    color="invert"
                    placement="top"
                  >
                    <FaFileImage size={18} className="text-gray-300" />
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute left-0 top-0 h-full  w-1 cursor-pointer opacity-0"
                      onChange={handleFileChange}
                    />
                  </Tooltip>
                </div>

                <MessagingGuidelines />
                <CharacterLimit characterCount={characterCount} />
                {/* <div
                  id="charLimit"
                  className={`    ${
                    characterCount <= 2400 ? "text-zinc-300" : "text-red-400"
                  }`}
                >
                  {characterCount}/2400
                </div> */}
              </div>
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

const CharacterLimit = ({ characterCount }) => {
  const isWithinLimit = characterCount <= 2400;

  return (
    <div
      id="charLimit"
      className={isWithinLimit ? "text-zinc-300" : "text-red-400"}
    >
      {characterCount}/2400
    </div>
  );
};

const MessageAttachment = ({
  messageAttachmentRecords,
  deleteMessageAttachment,
}) => {
  return messageAttachmentRecords.length ? (
    <div className="absolute bottom-14  my-2 flex justify-center space-x-4 rounded bg-zinc-900 p-2 text-gray-300">
      <div className="relative flex space-x-2">
        {messageAttachmentRecords.map((record) => (
          <div className="" key={record.url}>
            <img
              src={record.url}
              alt="Uploaded File Image"
              className=" h-44 w-44 rounded border-2 border-zinc-900 object-cover"
            />

            {/* <div className="absolute -top-10">
              <button className="btn-primary">
                <Tooltip content="Delete image" color="invert" placement="top">
                  <FaMinusCircle
                    onClick={deleteMessageAttachment(record.id)}
                    className="cursor-pointer "
                  />
                </Tooltip>
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className=""></div>
  );
};

const TextFormattingToolbar = ({ selectedText, insertMarkdown }) => {
  return (
    selectedText && (
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
          <Tooltip content="StrikeThrough" color="invert" placement="top">
            <FaStrikethrough />
          </Tooltip>
        </button>
        {/* <button type="button" onClick={handleInsertImage}>
          <Tooltip content="Image" color="invert" placement="top">
            <FaImage />
          </Tooltip>
        </button> */}
      </div>
    )
  );
};

export default observer(CreateMessage);
