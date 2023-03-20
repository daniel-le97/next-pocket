import { Transition } from "@headlessui/react";
import SideBar from "./SideBar/SideBar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: any }) => {
  const [showing, setShowing] = useState(false);
  const router = useRouter();
  useEffect(() => {

    setShowing(true);

    // // Define the cleanup function to reset the showing state
    // const cleanup = () => {
    //   setShowing(false);
    //   console.log(showing);
    // };

    // // Call the cleanup function when the component unmounts
    // return cleanup;
  }, [router.asPath]);

  
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
      {/* <div className="fixed bottom-0 p-0. bg-zinc-900  w-full"></div> */}
    </>
  );
};

export default Layout;
