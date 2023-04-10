import { FileUploadsRecord } from "~/PocketBaseTypes";

const MessageAttachments = ({
  messageAttachmentRecords,
  deleteMessageAttachment,
}:{
  messageAttachmentRecords: FileUploadsRecord[];
  deleteMessageAttachment: (id: string) => void;
}) => {
  return messageAttachmentRecords.length ? (
    <div className="absolute bottom-14  my-2 flex justify-center space-x-4 rounded bg-zinc-900 p-2 text-gray-300">
      <div className="relative flex space-x-2">
        {messageAttachmentRecords.map((record) => (
          <div className="" key={record.url}>
            <img
              src={record.url}
              alt="Uploaded File Image"
              className=" h-44 w-44 rounded border-2 border-zinc-900 object-cover"
            />

            {/* <div className="absolute -top-10">
              <button className="btn-primary">
                <Tooltip content="Delete image" color="invert" placement="top">
                  <FaMinusCircle
                    onClick={deleteMessageAttachment(record.id)}
                    className="cursor-pointer "
                  />
                </Tooltip>
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className=""></div>
  );
};
export default MessageAttachments;