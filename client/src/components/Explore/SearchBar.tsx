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

  const toggleInput = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="container mt-5 flex w-1/2 items-center justify-center">
 
        <input
          className={`text-gray-300 transition-all duration-700 ${
            expanded ? "w-full" : "scale-0 origin-right"
          }`}
          type="text"
          placeholder="Search Server By Name"
          value={query}
          
          onChange={handleInputChange}
        />
    
        <FaSearch
          size={32}
          className={`text-secondary ml-2 z-10 my-auto text-gray-500 hover:text-green-500 `}
          onClick={toggleInput}
        />
    
    </div>
  );
};

export default observer(SearchBar);