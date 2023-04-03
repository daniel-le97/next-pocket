/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */
import { observer } from "mobx-react";
import { BsPlusCircleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { serversService } from "../../services/ServersService";
import { uploadService } from "../../services/UploadsService";
import { pb } from "../../../utils/pocketBase";
import Loader from "../GlobalComponents/Loader";
import { useRouter } from "next/router";
import type { ServersRecord } from "../../../PocketBaseTypes/pocketbase-types";
import MyModal from "../GlobalComponents/Modal";
import{Tooltip} from '@nextui-org/react'
import { FaLock, FaLockOpen } from "react-icons/fa";
const user = pb.authStore.model;

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
    getValues,
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
      private:false
    },
  });
  const onSubmit = async (data: ServersRecord) => {
    try {
      const newServer = await serversService.createServer(data);
      reset();
      setImageUrl("");
      closeModal();
      router.push(`/server/${newServer.id}`);
    } catch (error) {
      console.error("createServer", error);

      await uploadService.deleteFile(user!.id, data.image!);
    }
  };

  const handleFileChange = (event: any) => {
    const uploadFile = async () => {
      // const file = Array.from(event.target.files)[0];

      const record = await uploadService.uploadFile(event.target.files);
      setImageUrl(record.url);
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

      <MyModal
        title="Create Server"
        buttonIcon={
          <div className="flex items-center justify-center">
            <Tooltip content="Create Server" placement="right" color="invert">
              <BsPlusCircleFill size={28} onClick={openModal} />
            </Tooltip>
          </div>
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3"
        >
          <label className=" block text-sm font-bold text-zinc-300">
            Server Name
          </label>
          <input
            {...register("name", {
              required: true,
              maxLength: 30,
              minLength: 5,
            })}
            type="text"
            className=" create-server-input"
          />
          {errors.name && <span>Retry</span>}

          <label className=" block text-sm font-bold text-zinc-300">
            Image:
          </label>
          <input
            type="file"
            name="imageFile"
            onChange={handleFileChange}
            className="file-upload-input"
          />
          {!uploading && imageUrl && (
            <img src={imageUrl} alt="" className="upload-preview-image" />
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
            Private Server:
          </label>
          <div className="flex  ">
            <input className="" type="checkbox" {...register("private",{
              required:true
            })} />
            
          </div>
          <button type="submit" className="btn-primary w-fit">
            Submit
          </button>
        </form>
      </MyModal>
    </div>
  );
};

export default observer(CreateServer);
