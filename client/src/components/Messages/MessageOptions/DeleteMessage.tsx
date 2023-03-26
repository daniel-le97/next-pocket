import { observer } from "mobx-react";
import { BsXCircle, BsXCircleFill } from "react-icons/bs";
import { FaRemoveFormat } from "react-icons/fa";
import { MessagesResponse } from "../../../../PocketBaseTypes/pocketbase-types";
import Pop from "../../../../utils/Pop";
import { messageService } from "../../../services/MessagesService";

const DeleteMessage = ({
  messageId,
  userId,
}: {
  messageId: string;
  userId: string;
}) => {
  const deleteMessage = async () => {
    try {
      const yes = await Pop.confirm();
      if (!yes) {
        return;
      }
      await messageService.deleteMessage(messageId);
    } catch (error) {
      Pop.error(error);
    }
  };
  return (
    <div className="message-options-icon  group/item " onClick={deleteMessage}>
      <BsXCircleFill size={22} />
      <span className="message-options-tooltip ">Remove</span>
    </div>
  );
};
export default observer(DeleteMessage);
