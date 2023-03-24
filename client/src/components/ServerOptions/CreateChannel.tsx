import { AppState } from "AppState";
import { observer } from "mobx-react"
import { Bs0CircleFill, BsPlusCircleFill } from "react-icons/bs";
import { FaUserMinus } from "react-icons/fa";

const CreateChannel = () => {
  return (
    <div className="w-full">
      {(
        <button className=" server-button" onClick={handleClick}>
          Create Channel
          <BsPlusCircleFill size={15} />
        </button>
      )}
    </div>
  );
}
function handleClick(){
  return
}
export default observer(CreateChannel)