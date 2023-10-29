
import { observer } from "mobx-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { FaQuestionCircle } from "react-icons/fa";

const MessagingGuidelines = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip content="Messaging GuideLine" color="invert" placement="top">
        <FaQuestionCircle
          size={18}
          className="text-gray-300"
          onClick={() => setIsOpen(true)}
        />
      </Tooltip>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="dialog-modal">
                  <Dialog.Title as="h3" className="dialog-title">
                    Messaging Guidelines
                  </Dialog.Title>
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
                        Use <code>#</code> for heading 1, <code>##</code> for
                        heading 2, and so on.
                      </li>
                      <li>
                        Use <code>-</code> or <code>*</code> for unordered
                        lists.
                      </li>
                      <li>
                        Use <code>1.</code> or <code>1)</code> for ordered
                        lists.
                      </li>
                      <li>
                        Use <code>[text](url)</code> or <code>&lt;url&gt;</code>{" "}
                        for links.
                      </li>
                      <li>
                        Use <code>![alt text](image url)</code> for images.
                      </li>
                      <li>
                        Use <code> [![](image url)](image url)</code> for Link
                        images.
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default observer(MessagingGuidelines);
