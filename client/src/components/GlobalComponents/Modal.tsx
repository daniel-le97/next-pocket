import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Fragment, useState } from "react";
import { ReactNode } from "react";
import { AppState } from "../../../AppState";
type ModalProps = {
  buttonIcon: React.ReactNode;
  title: string;
  children: React.ReactNode;
 
};
const MyModal = ({ buttonIcon, title, children}: ModalProps) => {


  return (
    <>
      <div className=" flex w-full items-center justify-center">
        <button
          type="button"
          onClick={() => {
            console.log('hi');
            AppState.modalStatus = true;
            
          }}
          className="w-full  "
          // className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {buttonIcon}
        </button>
      </div>

      <Transition appear show={AppState.modalStatus} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => AppState.modalStatus = false}>
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
                    {title}
                  </Dialog.Title>
                  {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div> */}
                  {children}
                  <div className="mt-4">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => AppState.modalStatus = false}
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
export default MyModal;
