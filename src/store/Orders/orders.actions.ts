import { auth, firestore } from "@/plugins/firebase";
import { getToday } from "@/utils/dateHelpers";
import FirebaseHelper from "@/utils/firebaseHelper";
import {
  addDoc,
  Timestamp,
  collection,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ActionContext } from "vuex";
import { SetIsLoading, Status } from "./constants";
import { Order } from "./types";

type Context = ActionContext<unknown, unknown>;

const SetOrder = "setOrder";
const SetOrders = "setOrders";
const OrdersAction = "orders";
const HistoryAction = "history";
const AppendHistory = "appendHistory";
const DateString = "date";
const Encounters = "encounters";
const EncounterHistory = "encounter_history";
const Equal = "==";
const SetListener = "setListener";
const StopListener = "stopListener";
const porter = "porter";
const status = "status";

export const startListenerForOrders = (context: Context) => {
  if (auth.currentUser) {
    context.commit(SetIsLoading, { action: OrdersAction, value: true });
    const q = query(
      collection(firestore, Encounters),
      where(DateString, Equal, getToday())
    );

    const snapShot = onSnapshot(q, (querySnapshot) => {
      const orders: Order[] = [];
      querySnapshot.forEach((doc) => {
        const order = doc.data();
        order.documentId = doc.id;
        orders.push(order as Order);
      });
      context.commit(SetOrders, orders);
    });
    context.commit(SetListener, snapShot);
    context.commit(SetIsLoading, { action: OrdersAction, value: false });
  }
};

export const stopListenerForOrders = (context: Context) => {
  context.commit(StopListener);
};

export const updateOrder = async (context: Context, order: Order) => {
  context.commit(SetIsLoading, { action: OrdersAction, value: true });
  order.status = Status.assigned;
  if (order.ref != null) {
    await updateDoc(order.ref, order);
    saveHistory(order, porter);
    context.commit(SetOrder, order);
  }
  context.commit(SetIsLoading, { action: OrdersAction, value: false });
};

export const updateStatus = async (context: Context, order: Order) => {
  context.commit(SetIsLoading, { action: OrdersAction, value: true });
  if (order.ref != null) {
    if (order.status === Status.unassigned) {
      order.area = "";
      order.porter = "";
      order.porterId = "";
    }
    await updateDoc(order.ref, order);
    saveHistory(order, status);
    context.commit(SetOrder, order);
  }
  context.commit(SetIsLoading, { action: OrdersAction, value: false });
};

export const fetchHistory = async (context: Context, orderId: string) => {
  context.commit(SetIsLoading, { action: HistoryAction, value: true });
  const histories = await FirebaseHelper.getOrderHistory(orderId);
  context.commit(AppendHistory, histories);
  context.commit(SetIsLoading, { action: HistoryAction, value: false });
};

const saveHistory = (order: Order, fieldUpdated: "porter" | "status") => {
  addDoc(collection(firestore, EncounterHistory), {
    encounterId: order.documentId,
    timeStamp: Timestamp.now(),
    userUid: auth.currentUser?.uid,
    fieldUpdated: fieldUpdated,
    userDisplayName: auth.currentUser?.displayName,
    newData: order[fieldUpdated],
  });
};
