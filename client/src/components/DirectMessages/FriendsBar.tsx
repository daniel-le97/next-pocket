/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState, Fragment } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Transition, Dialog } from "@headlessui/react";
import Pop from "utils/Pop";
import { User} from "PocketBaseTypes";
import type { Friend, UsersResponse, UsersStatusResponse } from "PocketBaseTypes";
import { AppState } from "AppState";
import { friendService } from "@/services";
import { UserIcon } from "../ChannelsBar/ChannelsBar";
import UserStatus from "../Messages/UsersStatus";
import UserBadge from "../GlobalComponents/UserBadge";

const topics = ["general", "tailwind-css", "react"];

const FriendsBar = () => {
  const friends = AppState.friends;
  // console.log('friends', friends);
  
  const user = AppState.user;
  const router = useRouter();
  const goToFriends = () => {
    router.push("/DirectMessages");
  };
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (!user) return;
        await friendService.getUserFriendsList();

        // setFriends(res?.expand?.friends);
      } catch (error) {
        Pop.error(error);
      }
    };
    fetchFriends();
  }, []);
  return (
    <div className="friends-bar">
      <div>
        <h5 className="channel-block-text" onClick={() => goToFriends()}>
          Friends
        </h5>
        <div className="channel-block">
          <h5 className="channel-block-text">Direct Messagesssss</h5>
        </div>
        <div className="px-3 ">
          {friends &&
            friends?.friends?.map((friend, index) => (
              <UserCard user={friend.user} status={friend.onlineStatus} key={index} />
            ))}
        </div>
      </div>
      {/* <UserIcon user={user} /> */}
      <UserIcon user={user}/>
    </div>
  );
};

const UserCard = ({ user, status }: { user: Partial<UsersResponse>, status : UsersStatusResponse}) => {
  // console.log('user', user);
  
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  function closeModal() {
    setIsOpen(false);
  }
  
  function openModal() {
    setIsOpen(true);
  }
  if (!user) return (<div>NO USER</div>)
  
  const handleClick = () => {
    router.push(`/DirectMessages/${user.id!}`);
  };
  
  return (
    <div
      onClick={handleClick}
      className="user-container my-3 flex cursor-pointer gap-x-2 rounded-md p-2 transition-all duration-150 ease-in hover:bg-zinc-500 hover:bg-opacity-25  "
    >
      <div className="relative">
        <img
          src={user.avatarUrl}
          alt="userIcon"
          width={30}
          className="rounded-full shadow-md shadow-zinc-900"
        />
        <div className="absolute left-8 top-9">
          {user && <UserStatus isOnline={status.isOnline!} />}
        </div>
      </div>
      <Menu isOpen={isOpen} />
      <small className=" font-bold text-rose-600">{user.username}</small>
    </div>
  );
};

const Menu = (props: { isOpen: boolean }) => {
  let { isOpen } = props; // access the isOpen boolean via props

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
      members: [],

      description: "",
    },
  });
  const onSubmit = (data: any) => {
    try {
      reset();
      setImageUrl("");


    } catch (error) {
      console.error("createServer", error);
    }
  };

  function closeModal() {
    isOpen = false;
  }

  return (
    <>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    {/* <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button> */}
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

// @ts-ignore

export default observer(FriendsBar);
