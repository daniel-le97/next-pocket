import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { AppState } from "../../../AppState";
import Pop from "../../../utils/Pop";
import { userService } from "../../services/UserService";

const AddFriend = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userService.getUsersList();

        setUsers(res);
      } catch (error) {
        Pop.error(error);
      }
    };
    fetchUsers()
  }, []);



  async function handleClick (){
    
  }
  return (
    <>
      <div className="rounded-md bg-zinc-900 p-5">
        <div className="relative  flex py-4">
          <input
            type="text"
            name=""
            id=""
            className="focus:shadow-outline z-10 w-full appearance-none rounded-md  border border-transparent bg-transparent p-5 leading-tight text-white shadow transition-all duration-200 ease-linear placeholder:text-zinc-300 focus:border-2 focus:border-indigo-500 focus:outline-none active:border-indigo-500 "
            placeholder="...Username "
          />
          <button className="absolute  right-3 bottom-7 rounded-md bg-indigo-700 p-2 font-semibold text-white transition-all duration-150 ease-linear hover:bg-opacity-80">
            Send Friend Request
          </button>

          {users && (
            <div className=" after:  absolute top-20   w-full rounded-b-md  border-2 border-t-0  border-indigo-400 bg-zinc-900 p-3 transition-all   duration-150 ease-linear">
              <ul className="  max-h-72 overflow-y-auto  rounded-sm  p-1 ">
                {users.map((u) => (
                  <li 
                  onClick={handleClick}
                  className="my-2  w-1/3 rounded-md bg-zinc-700 p-2 text-zinc-100">
                    <div className="flex gap-x-2">
                     
                      <img
                        src={u.avatarUrl}
                        alt="userImage"
                        className="h-10 w-10 rounded-full"
                      />
                      <div className=" flex items-center">{u?.username}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default observer(AddFriend);
