import { observer } from "mob-x-react";
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
                    <div className="mt-2">
                      {/* <p className="text-sm text-gray-500">
                        Your payment has been successfully submitted. We’ve sent
                        you an email with all of the details of your order.
                      </p> */}
                    </div>

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
                          // onChange={handleChange}

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
                        {/* <Loader show={true}/> */}
                        {/* {uploading && <Loader show={true} />} */}
                      </label>

                      {/* <ImageUploader /> */}
                      <label>
                        Description:
                        <textarea
                          {...register("description", { required: true })}
                          name="description"
                          className="m-1 ml-3 rounded-sm bg-gray-300 p-1 text-black placeholder:text-gray-100 required:border-2 required:border-red-400"
                          // onChange={handleChange}
                        />
                      </label>

                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                    </form>

                    {/* 
 <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        First Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
      <p className="text-red-500 text-xs italic">Please fill out this field.</p>
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Last Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe">
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Password
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
      <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div>
  */}

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

export default observer(CreateServer);
