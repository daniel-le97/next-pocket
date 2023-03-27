import { observer } from "mobx-react";
import { FaSearch } from "react-icons/fa";
import MyModal from "../../GlobalComponents/Modal";
import Modal from "../../GlobalComponents/Modal";

const SearchMembers = () => {
  return (
    <button className=" server-options-selection">
      <MyModal
        buttonIcon={
          <div className="flex w-full  justify-between">
            SearchMembers
            <FaSearch size={22} />
          </div>
        }
        title="Search Members"
      >
        <div className="">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat,
          libero minima nobis eaque eos nemo vel dolore id perspiciatis
          similique beatae autem doloribus fugit consequatur quidem pariatur
          labore eum cum.
        </div>
      </MyModal>
    </button>
  );
};
export default observer(SearchMembers);
