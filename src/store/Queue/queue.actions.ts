import { Context } from "../types";
import { AvailableTime } from "../Account/types";
import { Queue } from "./types";
import { format } from "date-fns";
import { convertTimeString } from "@/utils/dateHelpers";
import { getAll, getById } from "@/utils/apiHelpers";

type queueParam = {
  availableTime: [AvailableTime];
  listId: string;
};

export const getQueueToday = async (
  context: Context,
  { availableTime, listId }: queueParam
) => {
  if (!availableTime) return;

  const today = format(new Date(), "eee").toLowerCase();
  //check in the array of available time which is the time for today.
  const todayAvailability = availableTime.find((av: AvailableTime) => {
    return av.daysOfWeek.includes(today);
  });

  try {
    const lists: any = await getById({
      resource: "lists",
      resourceId: listId,
    });

    const queueData: Queue = {
      startTime: convertTimeString(todayAvailability?.availableStartTime ?? ""),
      endTime: convertTimeString(todayAvailability?.availableEndTime ?? ""),
      patientLists: lists.data,
    };

    context.commit("setQueue", queueData);
  } catch (e) {
    console.error("failed to load data from queue");
  }
};

export const getListId = async (context: Context) => {
  try {
    const { list_id }: any = await getAll("config");
    context.commit("setListId", list_id);
  } catch (e) {
    console.error("Failed to get the List id");
  }
};
