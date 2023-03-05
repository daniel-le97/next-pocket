/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Compressor from "compressorjs";
import { useEffect, useState } from "react";
import { AppState } from "../../AppState";
import { Collections } from "../../pocketbase-types";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";

const acceptedFileTypes = [
  "image/png",
  "image/jpeg",
  "image/svg",
  "image/svg+xml",
  "image/webp",
  "application/pdf",
];
class UploadService {
  async uploadFile(e: any) {
    const user = pb.authStore.model;
    const files = Array.from(e);
    AppState.loading = files.length;
    for await (const file of files) {
      if (!acceptedFileTypes.includes(file.type)) {
        throw new Error("unaccepted File Type");
      }

      const formData = new FormData();
      const compressed: string | Blob = await this.compress(file);

      formData.append("file", compressed);
      formData.append("user", user.id);
      const createdFile = await this.createFile(formData);
      const url = pb.getFileUrl(createdFile, createdFile.file, {
        thumb: "500x500",
      });
      AppState.loading--;
      const updatedFile = await pb
        .collection("fileUploads")
        .update(createdFile.id, { url: url });
      return updatedFile;

      // console.log({
      //   uncompressed: file.size / 1000000 + "mb",
      //   compressed: compressed.size / 1000 + "kb",
      //   url,
      // });
    }
  }
  async compress(file: any): Promise<Blob | File> {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.5,
        success(newFile) {
          resolve(newFile);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }
  // async compress(file:any) {
  //   let compressedFile :Blob | null = null;
  //   await new Promise<void>((resolve, reject) => {
  //     new Compressor(file, {
  //       quality: 0.5,
  //       success(newFile) {
  //         compressedFile = newFile;
  //         resolve();
  //       },
  //     });
  //   });
  //  return compressedFile
  // }

  async createFile(formData: any) {
    const file = await pb.collection("fileUploads").create(formData);

    return file;
  }


  async deleteFile(id:string){
     const record = await pb
       .collection("fileUploads")
       .getOne(id);
     console.log(record);

     await pb.collection("fileUploads").delete(record.id);
  }
}

export const uploadService = new UploadService();
