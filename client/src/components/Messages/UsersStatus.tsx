import { pb } from "../../../utils/pocketBase";
import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { Collections, UsersResponse } from "../../../pocketbase-types";
export default function UserStatus({ user }:{user:UsersResponse}) {
  const [isOnline, setIsOnline] = useState(false);
  const [userStatusRecord, setUserStatusRecord] = useState<any>(null);
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    const getStatus = async () => {
      const res = await pb
        .collection(Collections.UsersStatus)
        .getFirstListItem(`userId="${user?.id}"`);

  //  if(!res){
  //   throw new Error ('no res')
  //  }
      setUserStatusRecord(res);

      setIsOnline(res.isOnline);
    };
    getStatus();

    unsubscribe = async () => {
      const record = await pb
        .collection(Collections.UsersStatus)
        .getFirstListItem(`userId="${user?.id}"`);
     

      await pb.collection(Collections.UsersStatus).subscribe(record.id, function (e) {
        setIsOnline(e.record.isOnline);
        //  console.log(isOnline);
      });
    };
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

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
