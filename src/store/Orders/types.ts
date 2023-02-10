import { DocumentReference, DocumentData } from "@firebase/firestore";
import { Unsubscribe } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export type OrdersState = {
  orders: Order[];
  ordersHistories: Map<string, OrderHistory[]>;
  loadingData: {
    orders: { isLoading: boolean };
    history: { isLoading: boolean };
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
  comment?: string;
};

export type OrderGetter = Order & {
  required: boolean;
  hasTest: boolean;
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

export type OrderHistory = {
  encounterId: string;
  fieldUpdated: string;
  newData: string;
  timeStamp: Timestamp;
  documentId: string;
  userUid: string;
  userDisplayName: string;
};
