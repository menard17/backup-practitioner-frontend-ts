export type QueueState = {
  QueueData: Queue;
  loadingData: boolean;
  currentPatient: object | undefined;
  listId: string | undefined;
};

export type Queue = {
  startTime: string | undefined;
  endTime: string | undefined;
  patientLists: PatientList | undefined;
};

export type PatientList = {
  id: string;
  meta: any;
  mode: string;
  entry: [];
};
