import { observer } from "mobx-react-lite";
import { useState } from "react";
import { BsHash } from "react-icons/bs";
import { AppState } from "../../AppState";
import { pb } from "../../utils/pocketBase";
import { messageService } from "../services/MessageService";
const TopicSelection = ({ selection }) => {
  const [activeSelection, setActiveSelection] = useState("");
  const handleClick = async () => {
    try {
      const room = await pb
        .collection("rooms")
        .getFirstListItem(`title="${selection}"`, {
          expand: "messages",
        });

      AppState.activeRoom = room;

      await messageService.getMessages();
      setActiveSelection(selection);
      console.log(selection === AppState.activeRoom.title);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dropdown-selection " onClick={handleClick}>
      <BsHash size="24" className="text-gray-400" />
      <h5
        className={
          selection === AppState?.activeRoom?.title
            ? " dropdown-selection-text dark:text-green-400 text-pink-700"
            : " dropdown-selection-text text-gray-500"
        }
      >
        {selection}
      </h5>
    </div>
  );
};
export default observer(TopicSelection);
