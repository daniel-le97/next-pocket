/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { observer } from "mobx-react";
import { useState, useEffect, Fragment } from "react";
import { BsHash } from "react-icons/bs";
import { AppState } from "../../../AppState";
import { ChannelsResponse } from "../../../PocketBaseTypes/pocketbase-types";

import React from "react";
import { FaCog } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";

import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import EditChannel from "./EditChannel";
import { debounce } from "lodash";
const ChannelSelection = ({ selection }: { selection: ChannelsResponse }) => {
  const user = AppState.user;
  const router = useRouter();
  const { id, channel } = router.query as { id: string; channel: string };
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(false);
  };

  const changeChannel = async () => {
    try {
      await router.push(`/server/${id}/channel/${selection.id}`);

      AppState.messages = [];
      AppState.messageQuery = "";
    } catch (error) {
      console.error(error);
    }
  };
  const debouncedChangeChannel = debounce(changeChannel, 200);

  return (
    <div
      className={` channel-selection ${
        selection.title === AppState.activeChannel?.title &&
        " active-channel-selection  "
      }`}
      onClick={
        AppState.activeChannel?.id != selection.id
          ? debouncedChangeChannel
          : () => {}
      }
    >
      <BsHash size="24" className="text-gray-100" />
      <h5
        className={`channel-selection-text ${
          selection.title?.length! >= 30 ? " truncate" : ""
        }`}
      >
        {selection.title}
      </h5>

      {selection.title == AppState.activeChannel?.title &&
        selection.title != "GeneralChat" && (
          <>
            <Tooltip
              content={"Edit Channel"}
              color="invert"
              className=" font-bold"
            >
              <FaCog size={15} onClick={() => setIsOpen(true)} />
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
                        <Dialog.Title
                          as="h3"
                          className="dialog-title"
                        >

                          Edit Channel
                        </Dialog.Title>

                        <EditChannel toggleOpen={toggleOpen} />

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
        )}
    </div>
  );
};

export default observer(ChannelSelection);
