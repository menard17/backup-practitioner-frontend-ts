import { DocumentReference, DocumentData } from "@firebase/firestore";

export type PortersState = {
  porters: Porter[];
  loadingData: {
    porters: { isLoading: boolean };
  };
};

export type Porter = {
  id: string;
  active: boolean;
  name: string;
  area: string;
  ref: DocumentReference<DocumentData> | null;
  documentId: string;
};
