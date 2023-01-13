import { QueueState } from "./types";

const state: QueueState = {
  queueData: {
    startTime: undefined,
    endTime: undefined,
    patientLists: undefined,
  },
  currentPatient: undefined,
  listId: undefined,
  appointmentId: undefined,
  error: "",
  loadingConfig: false,
  loadingList: false,
  loadingNext: false,
};

export default state;
