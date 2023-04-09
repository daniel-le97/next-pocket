/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Compressor from "compressorjs";
import { useEffect, useState } from "react";
import { AppState } from "../../AppState";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
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
    const user = AppState.user;
    const files: File[] = Array.from(e);
    AppState.loading = files.length;
    for await (const file of files) {
      if (!acceptedFileTypes.includes(file.type)) {
        throw new Error("unaccepted File Type");
      }
      const formData = new FormData();

      const compressed: string | Blob = await this.compress(file);

      formData.append("file", compressed);

      formData.append("user", user!.id);
      formData.append("status", "pending");

      // If there is a previous document, delete the associated file and update the status
      const previousFile = await this.getFileUploadStatusByUserId(user!.id);
      if (previousFile) {
        await this.deleteFile(user!.id, previousFile.id);
      }

      const createdFile = await this.createFile(formData);

      const url = pb.getFileUrl(createdFile, createdFile.file, {
        thumb: "500x500",
      });

      AppState.loading--;

      const updatedFile = await pb
        .collection(Collections.FileUploads)
        .update(createdFile.id, { url: url });
      return updatedFile;
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

  async getFileUploadById(id: string) {
    const res = await pb.collection(Collections.FileUploads).getOne(id);
    return res;
  }

  async getFileUploadStatusByUserId(userId: string) {
    try {
      const res = await pb
        .collection(Collections.FileUploads)
        .getFirstListItem(`user = "${userId}" && status = "pending"`);
      return res;
    } catch (error) {
      console.error("Error fetching previous file:", error);
    }
  }
  async createFile(formData: FormData) {
    const file = await pb.collection(Collections.FileUploads).create(formData);

    return file;
  }

  async deleteFile(userId: string, id: string) {
    const res = await pb.collection(Collections.FileUploads).getOne(id);

    if (!res) {
      throw new Error("Bad or no Id");
    }
    if (userId != res.user) {
      throw new Error("Unauthorized");
    }
    await pb.collection(Collections.FileUploads).delete(res.id);
  }

  async updateStatus(userId: string, id: string) {
    const fileUpload = await this.getFileUploadById(id);
    if (!fileUpload) {
      throw new Error(" Bad or no Id");
    }
    if (userId != fileUpload.user) {
      throw new Error("Unauthorized");
    }

    const updatedFileUpload = await pb
      .collection(Collections.FileUploads)
      .update(id, { status: "uploaded" });
    return updatedFileUpload;
  }

  async uploadMessageAttachment(e: any) {
    const user = AppState.user;
    const files: File[] = Array.from(e);
    AppState.loading = files.length;
    for await (const file of files) {
      if (!acceptedFileTypes.includes(file.type)) {
        throw new Error("unaccepted File Type");
      }
      const formData = new FormData();

      const compressed: string | Blob = await this.compress(file);

      formData.append("file", compressed);

      formData.append("user", user!.id);
      formData.append("status", "pending");
      formData.append("channel", AppState?.activeChannel?.id);
      // // If there is a previous document, delete the associated file and update the status
      // const previousFile = await this.getFileUploadStatusByUserId(user!.id);
      // if (previousFile) {
      //   await this.deleteFile(user!.id, previousFile.id);
      // }

      const createdFile = await this.createMessageAttachment(formData);

      const url = pb.getFileUrl(createdFile, createdFile.file, {
        thumb: "500x500",
      });

      // AppState.loading--;

      const updatedFile = await pb
        .collection("messageAttachments")
        .update(createdFile.id, { url: url });
      return updatedFile;
    }
  }
  async getMessageAttachmentById(id: string) {
    const res = await pb.collection("messageAttachments").getOne(id);
    return res;
  }

  async createMessageAttachment(formData: FormData) {
    const file = await pb.collection("messageAttachments").create(formData);

    return file;
  }

  async deleteMessageAttachment(id: string) {
    const res = await pb.collection("messageAttachments").getOne(id);

    await pb.collection("messageAttachments").delete(res.id);
  }
}

export const uploadService = new UploadService();
