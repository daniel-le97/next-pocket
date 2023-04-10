import { FaFileImage } from "react-icons/fa";
import MessagingGuidelines from "./MessagingGuidelines";
import { Tooltip } from "@nextui-org/react";

const CreateMessageToolbar = ({
  characterCount,
  handleFileChange,
}: {
  characterCount: number;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="absolute -top-7 right-2 ">
      <div className="flex items-center justify-center space-x-3">
        <div className="  ">
          <Tooltip content="Upload image" color="invert" placement="top">
            <FaFileImage size={18} className="text-gray-300" />
            <input
              type="file"
              accept="image/*"
              className="absolute left-0 top-0 h-full  w-1 cursor-pointer opacity-0"
              onChange={handleFileChange}
            />
          </Tooltip>
        </div>

        <MessagingGuidelines />
      
        <div
          id="charLimit"
          className={`  font-semibold  text-sm   ${
            characterCount <= 2400 ? "text-zinc-300" : "text-red-400"
          }`}
        >
          {characterCount}/2400
        </div>
      </div>
    </div>
  );
};
export default CreateMessageToolbar;

