import { QueueState, Queue } from "./types";

export const setQueue = (state: QueueState, queue: Queue) => {
  state.queueData = queue;
};

export const setListId = (state: QueueState, value: string) => {
  state.listId = value;
};

export const setAppointmentId = (state: QueueState, value: string) => {
  state.appointmentId = value;
};

export const setError = (state: QueueState, value: string) => {
  state.error = value;
};

export const setLoadingNext = (state: QueueState, value: boolean) => {
  state.loadingNext = value;
};

export const setLoadingConfig = (state: QueueState, value: boolean) => {
  state.loadingConfig = value;
};

export const setLoadingList = (state: QueueState, value: boolean) => {
  state.loadingList = value;
};
