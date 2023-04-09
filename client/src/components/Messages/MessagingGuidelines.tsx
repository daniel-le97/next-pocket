import { AppState } from "AppState";
import { observer } from "mobx-react";
import { Bs0CircleFill, BsPlusCircleFill } from "react-icons/bs";
import { FaPlusCircle, FaQuestionCircle, FaUserMinus } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import router from "next/router";
import { serversService } from "@/services/ServersService";
import MyModal from "../GlobalComponents/Modal";
import { Tooltip } from "@nextui-org/react";

const MessagingGuidelines = () => {
  const [isOpen, setIsOpen] = useState(false);


  
  return (
    <MyModal
      buttonIcon={
  
          <Tooltip content="Messaging GuideLine" color="invert" placement="top">
            <FaQuestionCircle size={18} className="text-gray-300" />
          </Tooltip>

      }
      title="Messaging Guidelines for using Markdown"
    >
      <div className=" p-2 text-gray-900 dark:text-gray-300 ">
        <ul className="ml-4 list-disc">
          <li>
            Use <code>**text**</code> for bold text.
          </li>
          <li>
            Use <code>_text_</code> for italic text.
          </li>
          <li>
            Use <code>~~text~~</code> for strikethrough text.
          </li>
          <li>
            Use <code>`code`</code> for inline code.
          </li>
          <li>
            Use <code>``` code ```</code> for code blocks.
          </li>
          <li>
            Use <code>#</code> for heading 1, <code>##</code> for heading 2, and
            so on.
          </li>
          <li>
            Use <code>-</code> or <code>*</code> for unordered lists.
          </li>
          <li>
            Use <code>1.</code> or <code>1)</code> for ordered lists.
          </li>
          <li>
            Use <code>[text](url)</code> or <code>&lt;url&gt;</code> for links.
          </li>
          <li>
            Use <code>![alt text](image url)</code> for images.
          </li>
          <li>
            Use <code> [![](image url)](image url)</code> for Link images.
          </li>
        </ul>
      </div>
    </MyModal>
  );
};

export default observer(MessagingGuidelines);
