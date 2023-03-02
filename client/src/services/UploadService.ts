import Compressor from "compressorjs";
import { AppState } from "../../AppState";

class UploadService {
  async uploadFile(e, collection) {
    // const files = Array.from(e.target.files);
    // AppState.loading = files.length;
    // for await (const file of files) {
    //   let formData = new FormData();
    //   let compressed = await this.compress(file);
    //   formData.append("file", compressed);
    //   const createdFile = await this.createFile(formData, collection.name);
    //   const url = await pb.getFileUrl(createdFile, createdFile.file, {
    //     thumb: "500x500",
    //   });
    //   const getLastFile = await pb
    //     .collection(collection.name)
    //     .update(createdFile.id, { url });
    //   console.log({
    //     uncompressed: file.size / 1000000 + "mb",
    //     compressed: compressed.size / 1000 + "kb",
    //     url,
    //   });
    //   AppState.loading--;
  }
  async compress(file) {
    // let compressedFile = null;
    // await new Promise<void>((resolve, reject) => {
    //   new Compressor(file, {
    //     quality: 0.5,
    //     success(newFile) {
    //       compressedFile = newFile;
    //       resolve();
    //     },
    //   });
    // });
    // return compressedFile;
  }
}
 


export const uploadService = new UploadService()