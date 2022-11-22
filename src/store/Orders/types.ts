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
  ref: DocumentReference<DocumentData> | null;
  documentId: string;
};
