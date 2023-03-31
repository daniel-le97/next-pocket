/* eslint-disable @typescript-eslint/no-misused-promises */
import { messageService } from "@/services";
import { Tooltip } from "@nextui-org/react";
import { observer } from "mobx-react";
import { BsXCircleFill } from "react-icons/bs";
import Pop from "utils/Pop";

const DeleteMessage = ({messageId}: {messageId: string;}) => {
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
      <Tooltip placement="top" color="invert" content="Delete">
        <BsXCircleFill size={22} />
      </Tooltip>
    </div>
  );
};
export default observer(DeleteMessage);
