import { useState } from "react";
import { auth, storage, STATE_CHANGED } from "../lib/firebase";
import Loader from "./Loader";
import React from "react";
import { observer } from "";
import { pb } from "../../utils/pocketBase";
import { uploadService } from "../services/UploadService";

// Uploads images to Firebase Storage
const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const files = Array.from(e.target.files);
    // const extension = file.type.split("/")[1];
    setUploading(true);
    await uploadService.uploadFile(
      files,
      (event: { loaded: number; total: number }) => {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      }
    );

    setUploading(false);
  };

  return (
    <div className="box">
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <label className="">
          📸 :
          <input
            className="m-1 ml-3 rounded-sm bg-gray-300 p-1 text-black placeholder:text-gray-100 required:border-2 required:border-red-400"
            type="file"
            onChange={uploadFile}
            accept="image/x-png,image/gif,image/jpeg"
          />
        </label>
      )}

      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
};
export default observer(ImageUploader);
