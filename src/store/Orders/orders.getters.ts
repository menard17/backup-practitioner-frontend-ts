import { Order, OrdersState } from "./types";

export const orders = (state: OrdersState) => {
  return state.orders.map((order: Order) => {
    // TODO: AB#1229, Factoring these logic to make it more testable
    let hasMedicine = true;
    let hasTest = true;
    if (order.medicines.length == 0) {
      hasMedicine = false;
    }
    if (order.tests.length == 0) {
      hasTest = false;
    }
    if (
      order.medicines.length == 1 &&
      (order.medicines[0].value === "NA" ||
        order.medicines[0].value === "Other")
    ) {
      hasMedicine = false;
    }
    if (order.tests.length == 1 && order.tests[0].value === "NA") {
      hasTest = false;
    }
    return {
      name: order.name,
      phone: order.phone,
      porterId: order.porterId,
      documentId: order.documentId,
      status: order.status,
      area: order.area,
      porter: order.porter,
      address: order.address,
      required: hasMedicine || hasTest,
      ref: order.ref,
    };
  });
};

export const isLoading = (state: OrdersState): boolean => {
  return state.loadingData.orders.isLoading;
};
