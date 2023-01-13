export type QueueState = {
  queueData: Queue;
  currentPatient: object | undefined;
  listId: string | undefined;
  appointmentId: string | undefined;
  error: string | undefined;
  loadingConfig: boolean;
  loadingList: boolean;
  loadingNext: boolean;
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

export type TMapState<T> = Partial<Record<keyof T, (state: T) => T[keyof T]>>;

export type MapStateQueue = {
  queueData: Queue;
  listId: string | undefined;
  appointmentId: string | undefined;
  error: string | undefined;
  loadingConfig: boolean;
  loadingList: boolean;
};
