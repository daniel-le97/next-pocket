import { AppState } from "AppState";
import { Collections, ServersResponse } from "PocketBaseTypes";
import { observer } from "mobx-react";
import { useState, useEffect,useRef} from "react";
import { FaSearch } from "react-icons/fa";
import { pb } from "utils/pocketBase";
import { debounce } from "lodash";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(true);

  const debouncedFindServer = debounce(async (query: string) => {
    const res = await pb
      .collection(Collections.Servers)
      .getList<ServersResponse>(1, 9, {
        filter: `name ~ "${query}"  `,
        expand: "image,members",
      });
    AppState.servers = res.items;
  }, 1000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    debouncedFindServer(value);
  };


  const  filterUserServers = async () => {
    try {
      const res = await pb
        .collection(Collections.Servers)
        .getList<ServersResponse>(1, 9, {
          filter: `members.id = "${AppState.user?.id}"`,
          expand: "image,members",
        });
      AppState.servers = res.items;
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <div className=" container  relative mt-5 flex items-center justify-center">
      <div className="relative w-full flex justify-center">
        <input
          className={` w-1/2 transition-all duration-700 dark:text-gray-300 `}
          type="text"
          placeholder="Search Server By Name"
          value={query}
          onChange={handleInputChange}
        />

        <FaSearch
          size={32}
          className={`text-secondary absolute  right-64 top-1.5 z-10 my-auto ml-2 text-gray-500 `}
        />
      </div>

      {/* <div className="">
        <label >Filter Servers Im apart of</label>
        <input type="checkbox" className="" ref={checkboxRef} onChange={handleChange} />
      </div> */}
    </div>
  );
};

export default observer(SearchBar);