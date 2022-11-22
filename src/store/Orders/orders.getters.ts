import { Order, OrdersState } from "./types";

export const orders = (state: OrdersState) => {
  return state.orders.map((order: Order) => ({
    name: order.name,
    phone: order.phone,
    porterId: order.porterId,
    documentId: order.documentId,
    status: order.status,
    area: order.area,
    porter: order.porter,
    address: order.address,
    ref: order.ref,
  }));
};

export const isLoading = (state: OrdersState): boolean => {
  return state.loadingData.orders.isLoading;
};
