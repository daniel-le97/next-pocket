import { observer } from "mobx-react";
import { BsPlusCircleFill } from "react-icons/bs";

const CreateChannel = () => {
  return (
    <div className="w-full">
      {
        <button className=" server-button" onClick={handleClick}>
          Notification Settings
          <BsPlusCircleFill size={15} />
        </button>
      }
    </div>
  );
};
function handleClick() {
  return;
}
export default observer(CreateChannel);
