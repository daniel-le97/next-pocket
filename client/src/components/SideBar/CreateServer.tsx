/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */
import { observer } from "mobx-react";
import { BsPlusCircleFill } from "react-icons/bs";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { ChangeEventHandler, Fragment, useState } from "react";
import { serversService } from "../../services/ServersService";
import { uploadService } from "../../services/UploadsService";
import { pb } from "../../../utils/pocketBase";
import Loader from "../GlobalComponents/Loader";
import { useRouter } from "next/router";
import type { ServersRecord } from "../../../PocketBaseTypes/pocketbase-types";
import MyModal from "../GlobalComponents/Modal";
import { Tooltip } from "@nextui-org/react";
import { FaAsterisk, FaLock, FaLockOpen, FaUnlock } from "react-icons/fa";
import { AppState } from "~/AppState";

const CreateServer = () => {
  const user = AppState.user;
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      members: [user?.id],
      owner: user?.id,
      description: "",
      private: false,
    },
  });
  const onSubmit = async (data: ServersRecord) => {
    try {
      // console.log("hi");
      // console.log(data);

      const newServer = await serversService.createServer(data);
      reset();
      setImageUrl("");
      router.push(`/server/${newServer.id}`);
      setIsOpen(false);
    } catch (error) {
      console.error("createServer", error);

      await uploadService.deleteFile(user!.id, data.image!);
    }
  };

  const handleFileChange = (event: ChangeEventHandler<HTMLInputElement>) => {
    const uploadFile = async () => {
      // const file = Array.from(event.target.files)[0];

      const record = await uploadService.uploadFile(event.target.files);
      setImageUrl(record?.url);
      // setValue("imageUrl", record?.url);
      const id = record?.id;
      setValue("image", id!);
    };
    uploadFile();
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className=" sidebar-icon group justify-center ">
      {/* <BsPlusCircleFill size={28} onClick={openModal} /> */}

      {/* <MyModal
        title="Create Server"
        buttonIcon={
          <div className="flex items-center justify-center">
            <Tooltip content="Create Server" placement="right" color="invert">
              <BsPlusCircleFill size={28} />
            </Tooltip>
          </div>
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3"
        >
          <label className="  flex text-sm font-bold text-zinc-300">
            Server Name <FaAsterisk className="text-red-500" size={10} />
          </label>
          <input
            {...register("name", {
              required: true,
              maxLength: 30,
              minLength: 5,
            })}
            minLength={5}
            maxLength={30}
            type="text"
            className=" create-server-input"
          />
       

          <label className=" block text-sm font-bold text-zinc-300">
            Image:
          </label>
          <input
            type="file"
            name="imageFile"
            onChange={handleFileChange}
            className="file-upload-input"
          />

          {!uploading && imageUrl ? (
            <img src={imageUrl} alt="" className="upload-preview-image" />
          ) : (
            <div className="text-sm text-gray-300">
            
            </div>
          )}
          <Loader show={uploading} />

          <label className=" block text-sm font-bold text-zinc-300">
            Description :
          </label>
          <textarea
            {...register("description", { required: true })}
            name="description"
          />
          <label className=" block text-sm font-bold text-zinc-300">
            Private or Public Server:
          </label>
          <div className="relative my-2  flex">
         
            {isChecked ? (
              <FaLock
                className=" cursor-pointer text-red-500"
                size={20}
                onClick={(e) => {
                  setIsChecked(false);
                  setValue("private", false);
                }}
              />
            ) : (
              <FaUnlock
                className=" cursor-pointer text-green-500"
                size={20}
                onClick={(e) => {
                  setIsChecked(true);
                  setValue("private", true);
                }}
              />
            )}

            {isChecked ? (
              <label className="ml-2 text-sm font-bold text-zinc-300">
                Private
              </label>
            ) : (
              <label className="ml-2 text-sm font-bold text-zinc-300">
                Public
              </label>
            )}
          </div>
          <button type="submit" className="btn-primary w-fit">
            Submit
          </button>
        </form>
      </MyModal> */}
      <div className="flex items-center justify-center">
        <Tooltip content="Create Server" placement="right" color="invert">
          <BsPlusCircleFill size={28} onClick={openModal} />
        </Tooltip>
      </div>

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
                <Dialog.Panel className="dialog-modal">
                  <Dialog.Title as="h3" className="dialog-title">
                    Create Server
                  </Dialog.Title>

                  <div className="mt-4">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-y-3"
                    >
                      <label className="  flex text-sm font-bold text-zinc-300">
                        Server Name{" "}
                        <FaAsterisk className="text-red-500" size={10} />
                      </label>
                      <input
                        {...register("name", {
                          required: true,
                          maxLength: 30,
                          minLength: 5,
                          pattern: /^[a-zA-Z0-9_-]+$/,
                        })}
                        minLength={5}
                        maxLength={30}
                        pattern="^[a-zA-Z0-9_-]+$"
                        type="text"
                        className=" create-server-input"
                      />

                      <label className=" block text-sm font-bold text-zinc-300">
                        Image:
                      </label>
                      <input
                        type="file"
                        name="imageFile"
                        onChange={handleFileChange}
                        className="file-upload-input"
                      />

                      {!uploading && imageUrl ? (
                        <img
                          src={imageUrl}
                          alt=""
                          className="upload-preview-image"
                        />
                      ) : (
                        <div className="text-sm text-gray-300"></div>
                      )}
                      <Loader show={uploading} />

                      <label className=" block text-sm font-bold text-zinc-300">
                        Description :
                      </label>
                      <textarea
                        {...register("description", { required: true })}
                        name="description"
                      />
                      <label className=" block text-sm font-bold text-zinc-300">
                        Private or Public Server:
                      </label>
                      <div className="relative my-2  flex">
                        {isChecked ? (
                          <FaLock
                            className=" cursor-pointer text-red-500"
                            size={20}
                            onClick={(e) => {
                              setIsChecked(false);
                              setValue("private", false);
                            }}
                          />
                        ) : (
                          <FaUnlock
                            className=" cursor-pointer text-green-500"
                            size={20}
                            onClick={(e) => {
                              setIsChecked(true);
                              setValue("private", true);
                            }}
                          />
                        )}

                        {isChecked ? (
                          <label className="ml-2 text-sm font-bold text-zinc-300">
                            Private
                          </label>
                        ) : (
                          <label className="ml-2 text-sm font-bold text-zinc-300">
                            Public
                          </label>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button type="submit" className="btn-primary ">
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn-secondary "
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default observer(CreateServer);
