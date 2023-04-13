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
import Pop from "utils/Pop";
import { debounce } from "lodash";
import { useRouter } from "next/router";
const ChannelSelection = ({ selection }: { selection: ChannelsResponse }) => {
  const user = AppState.user;
  const router = useRouter();
  const { id, channel } = router.query as { id: string; channel: string };
  //TODO seems to be a bug with the router and the active channel due to the _app.tsx useEffect watching the userRecord, which is  updated when the user changes the channel
  const joinChannel = async () => {
    try {
      await router.push(`/server/${id}/channel/${selection.id}`);

      AppState.messages = [];
      AppState.messageQuery = "";

      // await channelsService.joinChannel({
      //   memberId: user?.id!,
      //   channelId: selection.id,
      // });
    } catch (error) {
      console.error(error);
    }
  };
  const debouncedJoinChannel = debounce(joinChannel, 200);

  return (
    <div
      className={`dropdown-selection  ${
        selection.title === AppState.activeChannel?.title
          ? "rounded bg-zinc-700 text-gray-300 "
          : "text-gray-500"
      }`}
      onClick={debouncedJoinChannel}
    >
      <BsHash size="24" className="text-gray-400" />
      <h5
        className={`dropdown-selection-text ${
          selection.title?.length >= 30 ? " truncate"  : ''
        }`}
      >
        {selection.title}
      </h5>

      {selection.title == AppState.activeChannel?.title &&
        selection.title != "GeneralChat" && (
          <div className="group relative">
            <MyModal
              buttonIcon={
                <Tooltip
                  content={"Edit Channel"}
                  color="invert"
                  className=" font-bold"
                >
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      members: AppState.activeChannel?.members,
      messages: AppState.activeChannel?.messages,

      title: AppState.activeChannel?.title,
      server: AppState.activeServer?.id,
    },
  });

  const updateChannel = async (data: ChannelsRecord) => {
    try {
      const id = AppState.activeChannel?.id;
      await channelsService.updateChannel(id, data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteChannel = async () => {
    try {
      const yes = await Pop.confirm();
      if (!yes) {
        return;
      }
      await channelsService.deleteChannel(AppState.activeChannel?.id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(updateChannel)}>
        <label className=" block text-sm font-bold text-zinc-300">
          Channel Title:
        </label>
        <input
          className="my-2"
          type="text "
          {...register("title", {
            required: true,
            minLength: 1,
            maxLength: 100,
          })}
        />

        <button className="btn-primary"> Submit</button>
      </form>
      <button className="btn btn-secondary mt-2 " onClick={deleteChannel}>
        Delete Channel{" "}
      </button>
    </>
  );
};
export default observer(ChannelSelection);
