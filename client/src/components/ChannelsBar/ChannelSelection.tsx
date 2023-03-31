/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import { BsHash } from "react-icons/bs";
import { AppState } from "../../../AppState";

import {
  ChannelsRecord,
  ChannelsResponse,
} from "../../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../../utils/pocketBase";
import { channelsService } from "../../services/ChannelsService";
import { messageService } from "../../services/MessagesService";
import React from "react";
import { FaCog } from "react-icons/fa";
import MyModal from "../GlobalComponents/Modal";
import { Tooltip } from "@nextui-org/react";
import { useForm } from "react-hook-form";
const ChannelSelection = ({ selection }: { selection: ChannelsResponse }) => {
  const user = AppState.user;
  const channelTitle: string | undefined = AppState.activeChannel?.title;
  const joinChannel = async () => {
    try {
      const user = AppState.user;
      if (!user) {
        console.error("must be logged in");
        return;
      }

      const data = {
        memberId: user?.id,
        channelId: selection?.id,
      };

      await channelsService.joinChannel(data);
      await messageService.getMessagesByChannelId(selection.id);
      // await messageService.getMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`dropdown-selection  ${
        selection.title === channelTitle
          ? "rounded bg-zinc-700 text-gray-300"
          : "text-gray-500"
      }`}
      onClick={joinChannel}
    >
      <BsHash size="24" className="text-gray-400" />
      <h5
        className="dropdown-selection-text "
        // className={
        //   selection.title === channelTitle
        //     ? " dropdown-selection-text text-pink-700 dark:text-green-400 "
        //     : " dropdown-selection-text text-gray-500"
        // }
      >
        {selection.title}
      </h5>

      {selection.title == channelTitle && (
        <div className="group relative">
          <MyModal
            buttonIcon={
              <Tooltip content={"Edit Channel"} color="invert" className=" font-bold">
                <FaCog size={15} />
              </Tooltip>
            }
            title="Edit Channel"
          >
            <EditChannel />
          </MyModal>
        </div>
      )}
    </div>
  );
};

const EditChannel = () => {

 const {
   register,
   handleSubmit,
   watch,
   setValue,
   reset,
   formState: { errors },
 } = useForm({
   defaultValues: {
     members: [],
     messages: [],

     title: AppState.activeChannel?.title,
     server: AppState.activeServer?.id,
   },
 });



  const onSubmit = async (data: ChannelsRecord) => {
    try {
      // await channelsService.updateChannel(data)
    } catch (error) {
      console.error(error);
    }
  };

  const deleteChannel = async () => {
    try {
      
    } catch (error) {
      console.error(errorvnb  )
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className=" block text-sm font-bold text-zinc-300">
          Channel Title:
        </label>
        <input
          className="my-2"
          type="text "
          {...register("title", {
            required: true,
            minLength: 5,
            maxLength: 20,
          })}
        />
        <button className="btn-primary"> Submit</button>
      </form>
      <button className="btn btn-secondary mt-2 " onClick={deleteChannel}>Delete Channel </button>
    </>
  );
};
export default observer(ChannelSelection);
