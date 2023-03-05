
import SideBar from "./SideBar/SideBar";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <SideBar />

      {children}
    </>
  );
};

export default Layout;
