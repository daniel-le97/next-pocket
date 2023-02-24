import { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { pb } from "../../utils/pocketBase";
// import { currentUser, pb } from "./pocketbase";
import { BsEmojiSmile, BsPencil, BsPlusCircleFill, BsRecordBtn, BsXCircle } from "react-icons/bs";
import { UserLogin } from "../models/user";
import { AppState } from "../../AppState";
import { messageService } from "../services/MessageService";
const Messages = () => {
  const [newMessage, setNewMessage] = useState("");
  const messages = AppState.messages;
  const listRef = useRef(null);
  let unsubscribe: (() => void) | null = null;
  const user = pb.authStore.model;
  const messageQuery = AppState.messageQuery
  useEffect(() => {
    const fetchMessages = async () => {
      await messageService.getMessages();
    };
    fetchMessages();

    unsubscribe = async () =>
      await pb
        .collection("messages")
        .subscribe("*", async ({ action, record }) => {
          if (action === "create") {
            // Fetch associated user
            const user = await pb.collection("users").getOne(record.user);
            record.expand = { user };
            // setMessages((prevMessages) => [...prevMessages, record]);
            let updatedMessages = [...AppState.messages];
            updatedMessages = [...updatedMessages, record];
            AppState.messages = updatedMessages;
          }
          // if (action === "delete") {
          //   setMessages((prevMessages) =>
          //     prevMessages.filter((m) => m.id !== record.id)
          //   );
          // }
        });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const sendMessage = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const user = pb.authStore.model;
    const data = {
      text: newMessage,
      user: user?.id,
      // @ts-ignore
      room: AppState?.activeRoom?.id,
    };
    const createdMessage = await pb.collection("messages").create(data);
    setNewMessage("");
  };

  return (
    <div className="messages snap-end pb-14" ref={listRef}>
      {messages &&
        messages?.map((message, index) => (
          <div className={messageQuery != ''? ' post-filtered group relative':' post  group  relative'} key={message.id}>
            <div className="avatar-wrapper">
              <img
                className="avatar"
                src={
                  message.expand.user.avatarUrl ||
                  `https://api.dicebear.com/5.x/bottts-neutral/svg`
                }
                alt="avatar"
                width="40px"
              />
            </div>
            <div className="post-content">
              <p className="post-owner">
                {message.expand?.user?.username}
                <small className="timestamp">
                  {new Date(message.created).toLocaleDateString()}
                </small>
              </p>
              <p className="post-text">{message.text}</p>
            </div>
            <div className="absolute bottom-16 right-0 mr-5 ">
              {index === messages.length - 1 && (
                <div className=" transition-all group-hover:opacity-0  ">
                  <div className=" relative w-full rounded-lg bg-red-400 px-3 text-sm font-bold text-white">
                    Newest Message
                    <hr className=" absolute top-1/2 right-32  z-0 ml-32 w-full   rounded-full border border-red-400 bg-red-400 " />
                  </div>
                </div>
              )}
            </div>
            <div className="absolute bottom-16 right-0  mr-5   opacity-0 group-hover:opacity-100">
              <div className=" post-options">
                <div className="group/item relative ">
                  <BsEmojiSmile size={22} />
                  <span className=" post-icon-tooltip  ">Like</span>
                </div>
                <div className="group/item relative">
                  <BsPencil size={22} />
                  <span className=" post-icon-tooltip  ">Edit</span>
                </div>
                <div className="group/item relative">
                  <BsXCircle size={22} />
                  <span className=" post-icon-tooltip  ">Remove</span>
                </div>
              </div>
            </div>
          </div>
        ))}


      <div className="bottom-bar   ">
        <PlusIcon />
        <form onSubmit={sendMessage}>
          <input
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder="Enter message..."
            className="bottom-bar-input"
          />
        </form>
      </div>
    </div>
  );
};
const PlusIcon = () => (
  <BsPlusCircleFill
    size="22"
    className="dark:text-primary mx-2 text-green-500 dark:shadow-lg"
  />
);
export default observer(Messages);
