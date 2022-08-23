import { PaymentsState } from "@/store/Payments/types";

export function setIsLoading(state: any, { action, value }: any) {
  state.loadingData[action].isLoading = value;
}

export function setBulkPaymentFiles(state: PaymentsState, value: any) {
  state.bulkPaymentFiles = value;
}
