import { observer } from "mobx-react-lite";
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { serversService } from "../../services/ServersService";
const data = {
  name: "test",
  description: "test",
  members: ["RELATION_RECORD_ID"],
  imageUrl: "test",
  imageFile: null,
};
const initialFormData = {
  name: data.name,
  description: data.description,
  members: data.members,
  imageUrl: data.imageUrl,
  
};
const CreateServer = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function createServer() {
    await serversService.createServer();
  }
  return (
    <div className=" sidebar-icon group ">
      <BsPlusCircleFill size={28} onClick={openModal} />

      <span className=" sidebar-tooltip group-hover:scale-100">
        CreateServer
        <div className="fixed inset-0 flex items-center justify-center"></div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 p-6 text-left align-middle shadow-xl shadow-zinc-800 transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-300"
                    >
                      Server Form
                    </Dialog.Title>
                    <div className="mt-2">
                      {/* <p className="text-sm text-gray-500">
                        Your payment has been successfully submitted. We’ve sent
                        you an email with all of the details of your order.
                      </p> */}
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-y-3 text-white"
                    >
                      <label>
                        Name:
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="m-1 ml-3 rounded-sm bg-gray-300 p-1 text-black placeholder:text-gray-100 required:border-2 required:border-red-400"
                        />
                      </label>

                      {/* <label>
                        Members:
                        <input
                          type="text"
                          name="members"
                          value={formData.members}
                          onChange={handleChange}
                        />
                      </label>
                      */}
                      <label>
                        Image URL:
                        <input
                          type="text"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleChange}
                          required
                        />
                      </label>

                      <label>
                        Description:
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </label>

                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                    </form>

                    {/* <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Got it, thanks!
                      </button>
                    </div> */}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </span>
    </div>
  );
};

const FormModal = () => {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return <></>;
};

export default observer(CreateServer);
