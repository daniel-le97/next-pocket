import { channelsService } from "@/services";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { AppState } from "~/AppState";
import { ChannelsRecord } from "~/PocketBaseTypes";
import Pop from "~/utils/Pop";

const EditChannel = ({ toggleOpen }: { toggleOpen: () => void }) => {
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
        const yes = await Pop.confirm("update channel?", "Are you sure?");
        if (!yes) {
          return;
        }
      const id = AppState.activeChannel?.id;
      await channelsService.updateChannel(id!, data);
      Pop.success("Channel Updated");
      toggleOpen();
    } catch (error) {
      Pop.error(error);
    }
  };

  const deleteChannel = async () => {
    try {
      const yes = await Pop.confirm("Delete channel?", "Are you sure?");
      if (!yes) {
        return;
      }
      await channelsService.deleteChannel(AppState.activeChannel?.id!);
      toggleOpen();
    } catch (error) {
      Pop.error(error);
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

        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
      <button className=" btn mt-2 flex bg-red-600" onClick={deleteChannel}>
        Delete Channel
        <FaTrash size={15} className="ml-2" />
      </button>
    </>
  );
};
export default observer(EditChannel);