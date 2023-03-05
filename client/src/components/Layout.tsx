
import SideBar from "./SideBar/SideBar";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <SideBar />

      <div className="pl-16">{children}</div>
    </>
  );
};

export default Layout;
