import { observer } from "mobx-react";
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { serversService } from "../../services/ServersService";
import { uploadService } from "../../services/UploadService";
import { pb } from "../../../utils/pocketBase";
import ImageUploader from "../ImageUploader";
import Loader from "../Loader";
import { useRouter } from "next/router";
const user = pb.authStore.model;
const data = {
  name: "test",
  description: "test",
  members: ["RELATION_RECORD_ID"],
  imageUrl: "test",
  imageFile: null,
};
const initialFormData = {
  name: "",
  description: "",
  members: [user?.id],
  imageUrl: "",
  // imageFile: null,
};
const CreateServer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      members: [user?.id],
      // imageUrl: "",
      owner: user?.id,
      description: "",
    },
  });
  const onSubmit = async (data: any) => {
    try {
      const newServer = await serversService.createServer(data);
      reset();
      setImageUrl("");
      closeModal();
      router.push(`http://localhost:3000/server/${newServer.id}`);
    } catch (error) {
      console.error("createServer", error);

      await uploadService.deleteFile(data.image);
    }
  };

  const handleFileChange = (event: any) => {
    const uploadFile = async () => {
      // const file = Array.from(event.target.files)[0];

      const record = await uploadService.uploadFile(event.target.files);
      setImageUrl(record.url);
      // setValue("imageUrl", record?.url);
      setValue("image", record?.id);
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
    <div className=" sidebar-icon group ">
      <BsPlusCircleFill size={28} onClick={openModal} />

      <span className=" sidebar-tooltip group-hover:scale-100">
        Create Server
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
                    <div className="mt-2"></div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-y-3 text-white"
                    >
                      <label>
                        Name:
                        <input
                          {...register("name", {
                            required: true,
                            maxLength: 30,
                            minLength: 5,
                          })}
                          type="text"
                          className="m-1 ml-3 rounded-sm bg-gray-300 p-1 text-black placeholder:text-gray-100 required:border-2 required:border-red-400"
                        />
                        {errors.name && <span>Retry</span>}
                      </label>

                      <label>
                        Image:
                        <input
                          type="file"
                          name="imageFile"
                          onChange={handleFileChange}
                        />
                        {!uploading && imageUrl && (
                          <img
                            src={imageUrl}
                            alt=""
                            className="mt-5 h-32 w-32 rounded-full object-cover"
                          />
                        )}
                        <Loader show={uploading} />
                      </label>

                      <label>
                        Description:
                        <textarea
                          {...register("description", { required: true })}
                          name="description"
                          className="m-1 ml-3 rounded-sm bg-gray-300 p-1 text-black placeholder:text-gray-100 required:border-2 required:border-red-400"
                        />
                      </label>

                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                    </form>
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

export default observer(CreateServer);
