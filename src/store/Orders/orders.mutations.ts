import { Unsubscribe } from "firebase/firestore";
import { Order, OrderHistory, OrdersState } from "./types";

type loadingAction = {
  action: "orders" | "history";
  value: boolean;
};

export const setIsLoading = (
  state: OrdersState,
  { action, value }: loadingAction
) => {
  state.loadingData[action].isLoading = value;
};

export const setOrders = (state: OrdersState, orders: Order[]) => {
  state.orders = orders;
};

export const appendHistory = (
  state: OrdersState,
  orderHistories: OrderHistory[]
) => {
  if (orderHistories.length > 0) {
    state.ordersHistories.set(orderHistories[0].encounterId, orderHistories);
  }
};

export const setOrder = (state: OrdersState, order: Order) => {
  const index = state.orders.findIndex(
    (item) => item.documentId === order.documentId
  );

  if (state.orders.length > index + 1) {
    state.orders = [
      ...state.orders.slice(0, index),
      order,
      ...state.orders.slice(index + 1),
    ];
  } else {
    state.orders = [...state.orders.slice(0, index), order];
  }
};

export const stopListener = (state: OrdersState): void => {
  if (state.listener != null) {
    state.listener();
  }
  state.orders = [];
};

export const setListener = (
  state: OrdersState,
  snapShot: Unsubscribe
): void => {
  state.listener = snapShot;
};
