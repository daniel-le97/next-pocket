import { AppState } from "AppState";
import { observer } from "mobx-react";
import { Bs0CircleFill, BsPlusCircleFill } from "react-icons/bs";
import { FaPlusCircle, FaUserMinus } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import router from "next/router";
import { serversService } from "@/services/ServersService";
import MyModal from "../GlobalComponents/Modal";
const CreateChannel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      members: [],
      messages: [],

      title: "",
      server: AppState.activeServer?.id,
    },
  });
  const onSubmit = async (data: ServersRecord) => {
    try {
      const newServer = await serversService.createServer(data);
      reset();

      setIsOpen(false);
      router.push(`http://localhost:3000/server/${newServer.id}`);
    } catch (error) {
      console.error("createServer", error);
    }
  };
  return (
    // <div className="w-full">
    //   {
    //     <button className=" server-button" onClick={() => setIsOpen(true)}>
    //       Create Channel
    //       <BsPlusCircleFill size={15} />
    //       <span className=" sidebar-tooltip group-hover:scale-100">
    //         Create Server
    //         <div className="fixed inset-0 flex items-center justify-center"></div>
    //         <Transition appear show={isOpen} as={Fragment}>
    //           <Dialog
    //             as="div"
    //             className="relative z-10"
    //             onClose={() => setIsOpen(false)}
    //           >
    //             <Transition.Child
    //               as={Fragment}
    //               enter="ease-out duration-300"
    //               enterFrom="opacity-0"
    //               enterTo="opacity-100"
    //               leave="ease-in duration-200"
    //               leaveFrom="opacity-100"
    //               leaveTo="opacity-0"
    //             >
    //               <div className="fixed inset-0 bg-black bg-opacity-25" />
    //             </Transition.Child>

    //             <div className="fixed inset-0 overflow-y-auto">
    //               <div className="flex min-h-full items-center justify-center p-4 text-center">
    //                 <Transition.Child
    //                   as={Fragment}
    //                   enter="ease-out duration-300"
    //                   enterFrom="opacity-0 scale-95"
    //                   enterTo="opacity-100 scale-100"
    //                   leave="ease-in duration-200"
    //                   leaveFrom="opacity-100 scale-100"
    //                   leaveTo="opacity-0 scale-95"
    //                 >
    //                   <Dialog.Panel className="dialog-modal">
    //                     <Dialog.Title as="h3" className="dialog-title">
    //                       Server Form
    //                     </Dialog.Title>

    //                     {/* <form
    //                       onSubmit={handleSubmit(onSubmit)}
    //                       className="create-server-form"
    //                     >
    //                       <label>
    //                         Name:
    //                         <input
    //                           {...register("title", {
    //                             required: true,
    //                             maxLength: 30,
    //                             minLength: 5,
    //                           })}
    //                           type="text"
    //                           className=" create-server-input"
    //                         />

    //                       </label>

    //                       <button
    //                         type="submit"
    //                         className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    //                       >
    //                         Submit
    //                       </button>
    //                     </form> */}
    //                   </Dialog.Panel>
    //                 </Transition.Child>
    //               </div>
    //             </div>
    //           </Dialog>
    //         </Transition>
    //       </span>
    //     </button>
    //   }
    // </div>

    <div className=" server-button">
      <MyModal
        buttonIcon={
          <div className="flex w-full  justify-between">
            Create Channel
            <FaPlusCircle size={18} />
          </div>
        }
        title="Create Channel"
      >
        <form onSubmit={handleSubmit(onsubmit)}>
          <input
            className=" ml-0 mr-auto bg-zinc-800 p-2 rounded-md w-full  cursor-text bg-transparent font-semibold text-gray-500 placeholder-gray-500 outline-none focus:w-full"
            type="text"
            placeholder="Enter Title"
            {...register("title", {
              required: true,
              minLength: 5,
              maxLength: 30,
            })}
          />

          <button  type="submit">
            Submit
          </button>
        </form>
      </MyModal>
    </div>
  );
};

export default observer(CreateChannel);
