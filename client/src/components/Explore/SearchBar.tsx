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

  const toggleInput = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="container mx-5 mt-5 flex items-center justify-center">
      <input
        className={`text-gray-300 transition-all duration-700 ${
          expanded ? "w-full" : "origin-right scale-0"
        }`}
        type="text"
        placeholder="Search Server By Name"
        value={query}
        onChange={handleInputChange}
      />

      <FaSearch
        size={32}
        className={`text-secondary z-10 my-auto ml-2 text-gray-500 hover:text-green-500 `}
        onClick={toggleInput}
      />

      {/* <div className="">
        <label >Filter Servers Im apart of</label>
        <input type="checkbox" className="" ref={checkboxRef} onChange={handleChange} />
      </div> */}
    </div>
  );
};

export default observer(SearchBar);