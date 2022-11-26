import { DocumentReference, DocumentData } from "@firebase/firestore";
import { Unsubscribe } from "firebase/auth";

export type OrdersState = {
  orders: Order[];
  loadingData: {
    orders: { isLoading: boolean };
  };
  listener: Unsubscribe | null;
};

export type Order = {
  name: string;
  porterId: string;
  porter: string;
  area: string;
  address: string;
  phone: string;
  status: string;
  medicines: Medicine[];
  tests: Test[];
  ref: DocumentReference<DocumentData> | null;
  documentId: string;
};

export type Medicine = {
  value: string;
  display: string;
  id?: string;
  verified?: string;
};

export type Test = {
  display: string;
  value: string;
  verified?: string;
};
