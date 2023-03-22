import { observer } from "mobx-react";
import { BsXCircle, BsXCircleFill } from "react-icons/bs";
import { FaHeart, FaRemoveFormat, FaThumbsUp } from "react-icons/fa";
import { MessagesResponse } from "../../../../PocketBaseTypes/pocketbase-types";
import Pop from "../../../../utils/Pop";
import { messageService } from "../../../services/MessageService";

const LikeMessage = ({ messageId }: { messageId: string }) => {
  const likeMessage = async () => {
    try {
      const yes = await Pop.confirm();
      if (!yes) {
        return;
      }
      // await messageService.likeMessage(messageId);
    } catch (error) {
      Pop.error(error);
    }
  };
  return (
    <div
      className="group/item relative p-2 transition-all ease-linear hover:bg-zinc-600 "
      onClick={likeMessage}
    >
      <FaThumbsUp size={22} />
      <span
        className="absolute  bottom-8 right-0 z-50  w-auto min-w-max origin-left scale-0 rounded-md
    bg-zinc-900 p-2 
    text-xs font-bold 
    text-white shadow-md transition-all duration-100
    group-hover/item:scale-100 "
      >
       Like
      </span>
    </div>
  );
};
export default observer(LikeMessage);
