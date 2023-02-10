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
      hasTest: hasTest && order.status !== "unassigned",
      ref: order.ref,
      comment: order.comment ?? "",
      medicines: order.medicines,
      tests: order.tests,
    };
  });
};

export const getHistoryByOrderId = (state: OrdersState) => {
  return (orderId: string) => {
    const histories = state.ordersHistories.get(orderId);
    return histories == undefined ? [] : histories;
  };
};

export const isLoading = (state: OrdersState): boolean => {
  return state.loadingData.orders.isLoading;
};

export const isLoadingHistory = (state: OrdersState): boolean => {
  return state.loadingData.history.isLoading;
};
