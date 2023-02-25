import { pb } from "../../utils/pocketBase";
import {useState,useEffect} from 'react'
export default function UserStatus({ userId }) {
  const [isOnline, setIsOnline] = useState(false);

  // useEffect(() => {
  //   const statusRef = pb.collection("usersStatus").

  //   // Set up a listener for changes to the user's status document
  //   const unsubscribe = statusRef.onSnapshot((doc) => {
  //     if (doc.exists) {
  //       const data = doc.data();
  //       setIsOnline(data.isOnline);
  //     }
  //   });

  //   return unsubscribe;
  // }, [userId]);






 useEffect(() => {
 
  
    // const fetchMessages = async () => {
    //   await messageService.getMessages();
    // };
    // fetchMessages();

  const   unsubscribe = async () =>
      await pb
        .collection("usersStatus")
        .subscribe("*", async (e) => {
        console.log(e.record);
        
            // const user = await pb.collection("users").getOne(record.user);
            // record.expand = { user };
            // let updatedMessages = [...AppState.messages];
            // updatedMessages = [...updatedMessages, record];
            // AppState.messages = updatedMessages;
          
          // if (action === "delete") {
          //   setMessages((prevMessages) =>
          //     prevMessages.filter((m) => m.id !== record.id)
          //   );
          // }
        });

        unsubscribe()
    // return () => {
    //   if (unsubscribe) {
    //     unsubscribe();
    //   }
    // };
  }, []);













  return (
    <div>
      User {userId} is {isOnline ? "online" : "offline"}
    </div>
  );
}
