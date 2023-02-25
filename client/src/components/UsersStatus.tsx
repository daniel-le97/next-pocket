import { pb } from "../../utils/pocketBase";
import {useState,useEffect} from 'react'
import { FaCircle } from "react-icons/fa";
export default function UserStatus({user}) {
  const [isOnline, setIsOnline] = useState(false);
 const [userStatusRecord,setUserStatusRecord] = useState(null)
 useEffect(() => {

  let unsubscribe: (() => void) | null = null;
  const getStatus = async () =>{
    const res = await pb.collection('usersStatus').getFirstListItem(`userId="${user?.id}"`)
  
    // console.log(res);
    
    setUserStatusRecord(res)
    console.log(res.isOnline);
    
setIsOnline(res.isOnline)


  }
  getStatus()

  // const unsubscribe = async () => {
  //  await  pb
  //     .collection("usersStatus")
  //     .subscribe("*", function (e) {
  //       console.log(e);
  //     });
  // }
  // unsubscribe()

   unsubscribe = async () =>{

    const record = await pb.collection('usersStatus').getFirstListItem(`userId="${user?.id}"`)
    // console.log(record?.id);
    
  
     await pb.collection('usersStatus').subscribe(record.id, function (e) {
    console.log(e.record);

        
        
    
          
          setIsOnline(e.record.isOnline)
        //  console.log(isOnline);
         
       
       });
      }
   return () => {
     if (unsubscribe) {
       unsubscribe();
     }
   };
   
  }, []);













  return (
    <div className="absolute right-0 rounded-full shadow-md shadow-zinc-800 ">
      {isOnline ? <FaCircle color="#22c55e" /> : <FaCircle color="#ef4444" />}
    </div>
  );
}
