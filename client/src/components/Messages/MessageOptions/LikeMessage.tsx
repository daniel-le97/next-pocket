/* eslint-disable @typescript-eslint/no-misused-promises */
import { likesService } from "@/services/LikesService";
import { Tooltip } from "@nextui-org/react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import Pop from "utils/Pop";
import { AppState } from "~/AppState";

const LikeMessage = ({ messageId }: { messageId: string }) => {
  const router = useRouter();
  const isDMPath = router.pathname.includes("DirectMessages");
  const likeMessage = async () => {
    try {
      // const yes = await Pop.confirm();
      // if (!yes) {
      //   return;
      // }
      if (isDMPath) {
        await likesService.create(messageId, "directMessage");
        return;
      }
      // console.log(messageId);

      await likesService.create(messageId, "message");

      
      // await likesService.getAll()
    } catch (error) {
      Pop.error(error);
    }
  };

 

  return (
    <div className="group/item message-options-icon" onClick={likeMessage}>
      <Tooltip content="Like" color="invert" placement="top">
        <FaThumbsUp size={22} />
      </Tooltip>
      {/* <span
        className="absolute  bottom-8 right-0 z-50  w-auto min-w-max origin-left scale-0 rounded-md
    bg-zinc-900 p-2 
    text-xs font-bold 
    text-white shadow-md transition-all duration-100
    group-hover/item:scale-100 "
      >
        Like
      </span> */}
    </div>
  );
};
export default observer(LikeMessage);
