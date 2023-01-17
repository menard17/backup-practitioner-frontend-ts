import { Context } from "../types";
import { AvailableTime } from "../Account/types";
import { Queue } from "./types";
import { format } from "date-fns";
import { convertTimeString } from "@/utils/dateHelpers";
import { getAll, getById, callLogicApp } from "@/utils/apiHelpers";
import { AxiosError } from "axios";

type queueParam = {
  availableTime: [AvailableTime];
};

export const getQueueToday = async (
  context: Context,
  { availableTime }: queueParam
) => {
  if (!availableTime) return;
  const id = context.state.listId;
  if (!id) return;

  const today = format(new Date(), "eee").toLowerCase();
  //check in the array of available time which is the time for today.
  const todayAvailability = availableTime.find((av: AvailableTime) => {
    return av.daysOfWeek.includes(today);
  });

  context.commit("setLoadingList", true);

  try {
    const lists: any = await getById({
      resource: "lists",
      resourceId: id,
    });

    const queueData: Queue = {
      startTime: convertTimeString(todayAvailability?.availableStartTime ?? ""),
      endTime: convertTimeString(todayAvailability?.availableEndTime ?? ""),
      patientLists: lists.data,
    };

    context.commit("setQueue", queueData);
  } catch (e) {
    console.error("failed to load data from queue");
  } finally {
    context.commit("setLoadingList", false);
  }
};

export const getListId = async (context: Context) => {
  try {
    context.commit("setLoadingConfig", true);
    const { patientQueueListId }: any = await getAll("config");
    context.commit("setListId", patientQueueListId);
  } catch (e) {
    console.error("Failed to get the List id");
  } finally {
    context.commit("setLoadingConfig", false);
  }
};

export const nextPatient = async (context: Context) => {
  const practId = context.rootState.$_account.practitioner.id;
  const listId = context.state.listId;
  if (!listId || !practId) return;

  context.commit("setLoadingNext", true);

  try {
    const {
      data: { id },
    }: any = await callLogicApp(
      {},
      `appointments/list/${listId}/practitioner/${practId}`
    );
    context.commit("setAppointmentId", id);
  } catch (error) {
    const err = error as AxiosError;
    const message = err.response?.data ?? err.message;
    context.commit("setError", message);
    context.commit("setAppointmentId", undefined);
  } finally {
    context.commit("setLoadingNext", false);
  }
};

export const setError = (context: Context, errorMessage: string) => {
  context.commit("setError", errorMessage);
};
