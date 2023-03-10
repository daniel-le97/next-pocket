import { pb } from "../../../utils/pocketBase";
import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import {
  Collections,
  UsersResponse,
} from "../../../PocketBaseTypes/pocketbase-types";
import Pop from "../../../utils/Pop";
export default function UserStatus({ user }: { user: UsersResponse }) {
  const [isOnline, setIsOnline] = useState(false);
  const [userStatusRecord, setUserStatusRecord] = useState<any>(null);

  useEffect(() => {


    const fetchStatus = async () => {
      try {
       
        
        const res = await pb
          .collection("usersStatus")
          .getFirstListItem(`userId="${user?.id}"`);

        setUserStatusRecord(res);

        setIsOnline(res.isOnline);
      } catch (error) {
        if (error.status === 404) {
          console.error(error);

          return;
        }
        Pop.error(error);
      }
    };
    fetchStatus();


    
    const unsubscribe = async () => {
    if (userStatusRecord) {
        await pb
          .collection("usersStatus")
          .subscribe(userStatusRecord?.id, function (e) {
            console.log(e.record);

            setIsOnline(e.record.isOnline);
          });
    }
    };
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userStatusRecord]);

  return (
    <div className="absolute right-0 bottom-0 rounded-full border-4 border-zinc-700 shadow-md shadow-zinc-700 ">
      {isOnline ? (
        <FaCircle color="#22c55e" size={10} />
      ) : (
        <FaCircle color="#ef4444" size={10} />
      )}
    </div>
  );
}

//  const getStatus = async () => {
//    try {
//      const res = await pb
//        .collection(Collections.UsersStatus)
//        .getFirstListItem(`userId="${user?.id}"`);

//      setUserStatusRecord(res);

//      setIsOnline(res.isOnline);
//    } catch (error) {
//      if (error.status === 404) {
//        return;
//      }
//      Pop.error(error);
//    }
//  };
//  getStatus();
