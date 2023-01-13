import { QueueState } from "./types";

export function loadingData(state: QueueState): boolean {
  return state.loadingConfig || state.loadingList;
}
