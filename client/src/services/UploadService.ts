import Compressor from "compressorjs";
import { AppState } from "../../AppState";
import { Collections } from "../../pocketbase-types";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";

class UploadService {
  async uploadFile(e:any) {
    const files = Array.from(e);
    AppState.loading = files.length;
    for await (const file of files) {
      let formData = new FormData();
      let compressed:string | Blob = await this.compress(file);

      formData.append("file", compressed);
      const createdFile = await this.createFile(formData);
      const url = pb.getFileUrl(createdFile, createdFile.file, {
        thumb: "500x500",
      });
      AppState.loading--;
      return url
      // const getLastFile = await pb
      //   .collection('fileUploads')
      //   .update(createdFile.id, { url });
      // console.log({
      //   uncompressed: file.size / 1000000 + "mb",
      //   compressed: compressed.size / 1000 + "kb",
      //   url,
      // });
    }
  }
  async compress(file:any) {
    let compressedFile :Blob | null = null;
    await new Promise<void>((resolve, reject) => {
      new Compressor(file, {
        quality: 0.5,
        success(newFile) {
          compressedFile = newFile;
          resolve();
        },
      });
    });
    return compressedFile;
  }

  async createFile(formData) {
    try {
      const file = await pb.collection('fileUploads').create(formData)
      // const file = await pb.collection(collectionName).create(formData);
      return file;
    } catch (error) {
      Pop.error(error, "please contact an admin");
      // console.error(error);
      
    }
  }
}


export const uploadService = new UploadService()