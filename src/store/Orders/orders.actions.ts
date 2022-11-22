import { auth, firestore } from "@/plugins/firebase";
import {
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
const DateString = "date";
const Encounters = "encounters";
const Equal = "==";
const SetListener = "setListener";
const StopListener = "stopListener";

export const startListenerForOrders = (context: Context) => {
  if (auth.currentUser) {
    const q = query(
      collection(firestore, Encounters),
      where(DateString, Equal, getToday())
    );
    const snapShot = onSnapshot(q, (querySnapshot) => {
      const orders: Order[] = [];
      querySnapshot.forEach((doc) => {
        const order = doc.data();
        order.documentId = doc.id;
        order.ref = doc.ref;
        orders.push(order as Order);
      });
      context.commit(SetOrders, orders);
    });
    context.commit(SetListener, snapShot);
  }
};

export const stopListenerForOrders = (context: Context) => {
  context.commit(StopListener);
};

const getToday = (): string => {
  return new Date().toLocaleDateString("sv").replaceAll("-", "");
};

export const updateOrder = async (context: Context, order: Order) => {
  context.commit(SetIsLoading, { action: OrdersAction, value: true });
  order.status = Status.assigned;
  if (order.ref != null) {
    await updateDoc(order.ref, order);
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
    context.commit(SetOrder, order);
  }
  context.commit(SetIsLoading, { action: OrdersAction, value: false });
};
