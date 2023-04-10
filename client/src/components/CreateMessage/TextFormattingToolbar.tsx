import { Tooltip } from "@nextui-org/react";
import { FaBold, FaItalic, FaStrikethrough } from "react-icons/fa";

const TextFormattingToolbar = ({
  selectedText,
  insertMarkdown,
}: {
  selectedText: string;
  insertMarkdown: (start: string, end: string, selectedText: string) => void;
}) => {
  return selectedText ? (
    <div className="absolute -top-11  my-2 flex justify-center rounded bg-zinc-900  text-gray-300">
      <button
        className="p-2 hover:bg-zinc-800"
        type="button"
        onClick={() => insertMarkdown("**", "**", selectedText)}
      >
        <Tooltip content="Bold" color="invert" placement="top">
          <FaBold />
        </Tooltip>
      </button>
      <button
        className="p-2 hover:bg-zinc-800"
        type="button"
        onClick={() => insertMarkdown("*", "*", selectedText)}
      >
        <Tooltip content="Italic" color="invert" placement="top">
          <FaItalic />
        </Tooltip>
      </button>
      <button
        className="p-2 hover:bg-zinc-800"
        type="button"
        onClick={() => insertMarkdown("~~", "~~", selectedText)}
      >
        <Tooltip content="StrikeThrough" color="invert" placement="top">
          <FaStrikethrough />
        </Tooltip>
      </button>
      {/* <button type="button" onClick={handleInsertImage}>
          <Tooltip content="Image" color="invert" placement="top">
            <FaImage />
          </Tooltip>
        </button> */}
    </div>
  ) : (
    <div></div>
  );
};

export default TextFormattingToolbar;
