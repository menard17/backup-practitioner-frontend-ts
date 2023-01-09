import { QueueState, Queue } from "./types";

export const setQueue = (state: QueueState, queue: Queue) => {
  state.QueueData = queue;
};

export const setIsLoading = (state: QueueState, value: boolean) => {
  state.loadingData = value;
};

export const setListId = (state: QueueState, value: string) => {
  state.listId = value;
};
