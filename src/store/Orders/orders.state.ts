import { OrdersState } from "./types";

const state: OrdersState = {
  orders: [],
  loadingData: {
    orders: { isLoading: false },
  },
  listener: null,
};

export default state;
