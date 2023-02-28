import { observer } from "mobx-react-lite";

const ServerSelection = () => {
  return (
    <div className="sidebar-icon group">
      <img
        src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=234`}
        alt="UserIcon"
        className="rounded-full"
      />
      <span className=" sidebar-tooltip group-hover:scale-100">
        Server To Add{" "}
      </span>
    </div>
  );
};

export default observer(ServerSelection)