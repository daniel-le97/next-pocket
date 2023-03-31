import { Transition } from "@headlessui/react";
import SideBar from "./SideBar/SideBar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AppState } from "../../AppState";
import { Admin, Record } from "pocketbase";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showing, setShowing] = useState(false);
  const [user, setUser] = useState<Record | Admin | null>(null);
  const router = useRouter();

  useEffect(() => {
    setShowing(true);
    setUser(AppState.user);
  }, [router.asPath]);

  return (
    <>
      {user && <SideBar />}
      <Transition
        show={showing}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={`${user ? "pl-16" : ""} `}>{children}</div>
      </Transition>
    </>
  );
};

export default Layout;
