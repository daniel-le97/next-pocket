import { observer } from "mobx-react"
import { useEffect,useState } from "react";
import { AppState } from "../../../AppState";
import { userService } from "../../services/UserService";


const AddFriend = ()=>{
const [users,setUsers] = useState([])
useEffect(()=>{
  const users = userService.getUsersList()
},[])


}
export default observer(AddFriend);