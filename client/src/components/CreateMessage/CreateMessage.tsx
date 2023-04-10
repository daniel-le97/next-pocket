/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { AppState } from "../../../AppState";
import { messageService } from "../../services/MessagesService";
import DOMPurify from "dompurify";
import type {
  DirectMessagesRecord,
  FileUploadsResponse,
  MessagesRecord,
} from "../../../PocketBaseTypes/pocketbase-types";
import { useForm } from "react-hook-form";
import Pop from "../../../utils/Pop";

import { directMessageService, uploadService } from "@/services";
import MessageAttachments from "./MessageAttachments";
import TextFormattingToolbar from "./TextFormattingToolbar";
import CreateMessageToolbar from "./CreateMessageToolbar";
import { useRouter } from "next/router";
const CreateMessage = () => {
  const [selectedText, setSelectedText] = useState("");
  const [selectionStart, setSelectionStart] = useState(-1);
  const [selectionEnd, setSelectionEnd] = useState(-1);
  const user = AppState.user;
  const router = useRouter();
  const [characterCount, setCharacterCount] = useState(0);
  const [messageAttachmentRecords, setMessageAttachmentRecords] = useState<
    FileUploadsResponse[]
  >([]);

  const defaultValues = {
    content: "",
    attachments: "",
  };

  if (router.pathname === "/DirectMessages/[id]") {
    defaultValues.sender = user!.id;
    defaultValues.friendRecord = "";
  } else {
    defaultValues.user = user!.id;
    defaultValues.channel = "";
  }

  // if (router.pathname === "/DirectMessages/[id]") {
  //   defaultValues.sender = user!.id;
  //   delete defaultValues.channel;
  //   defaultValues.friendRecord = "test";
  // }
  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues,
  });

  const sendMessage = async (data: MessagesRecord) => {
    try {
      const inputEl = document.getElementById(
        "createMessageInput"
      ) as HTMLInputElement;

      function sanitizeUserInput(input: string) {
        const sanitized = DOMPurify.sanitize(input);
        return sanitized;
      }

      if (data.content) {
        const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))(?=[^\s]*\s)/g;
        data.content = data.content.replace(regex, "![$1]($1)");
        data.content = sanitizeUserInput(data.content);
      }

      data.channel = AppState.activeChannel?.id;

      // console.log(data.content);

      if (router.pathname === "/DirectMessages/[id]") {
        const directMessageData = data as DirectMessagesRecord;
        delete directMessageData.channel;
        setValue("friendRecord", router.query.id);
        await directMessageService.createDirectMessage(directMessageData);
        reset();
        inputEl.style.height = "initial";
        setCharacterCount(0);
        setMessageAttachmentRecords([]);
      }
      await messageService.sendMessage(data, messageAttachmentRecords);
      reset();
      inputEl.style.height = "initial";
      setCharacterCount(0);
      setMessageAttachmentRecords([]);
    } catch (error) {
      Pop.error(error);
    }
  };
  useEffect(() => {
    console.log(defaultValues);
  }, []);

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

  const deleteMessageAttachment = async (id: string) => {
    try {
      await uploadService.deleteFile(AppState?.user?.id!, id);

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

      const id = record?.id;
      setValue("attachments", id!);
      setMessageAttachmentRecords([
        ...messageAttachmentRecords,
        record as FileUploadsResponse,
      ]);
      inputEl.value = inputEl.value + `![${record?.url}](${record?.url})`;
    };
    uploadFile();
  };
  return (
    <div className=" absolute  bottom-2  max-h-full w-full     ">
      <form
        onSubmit={handleSubmit(sendMessage)}
        className="relative mx-4  flex"
      >
        {AppState.user ? (
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
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
                setCharacterCount(target.value.length);
                if (characterCount >= 2400) {
                  e.preventDefault();
                }

                const containsScriptTag =
                  /<script\b[^>]*>([\s\S]*?)<\/script>/gm.test(target.value);
                if (containsScriptTag) {
                  target.value = target.value.replace(
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

            <MessageAttachments
              messageAttachmentRecords={messageAttachmentRecords}
              deleteMessageAttachment={deleteMessageAttachment}
            />
            <CreateMessageToolbar
              characterCount={characterCount}
              handleFileChange={handleFileChange}
            />

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
