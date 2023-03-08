import { Transition } from "@headlessui/react";
import SideBar from "./SideBar/SideBar";
import {useState,useEffect} from 'react'

const Layout = ({ children }: { children: any }) => {
  const [showing,setShowing] = useState(false)
  useEffect(()=>{
     setShowing(true);
  

    
    
  },[children])
  return (
    <>
      <SideBar />
      <Transition
      show={showing}
        enter="transition-all duration-300"
        enterFrom="opacity-0 "
        enterTo="opacity-100 "
        leave="transition-all duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="pl-16">{children}</div>
      </Transition>
    </>
  );
};

export default Layout;
