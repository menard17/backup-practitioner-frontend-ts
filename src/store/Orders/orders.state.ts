import { OrdersState } from "./types";

const state: OrdersState = {
  orders: [],
  ordersHistories: new Map(),
  loadingData: {
    orders: { isLoading: false },
    history: { isLoading: false },
  },
  listener: null,
};

export default state;
