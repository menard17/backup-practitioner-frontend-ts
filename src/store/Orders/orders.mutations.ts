import { Unsubscribe } from "firebase/firestore";
import { Order, OrdersState } from "./types";

type loadingAction = {
  action: "orders";
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
