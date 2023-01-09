import { QueueState } from "./types";

const state: QueueState = {
  QueueData: {
    startTime: undefined,
    endTime: undefined,
    patientLists: undefined,
  },
  loadingData: false,
  currentPatient: undefined,
  listId: undefined,
};

export default state;
