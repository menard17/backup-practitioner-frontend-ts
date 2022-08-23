import { FileUploadObject } from "@/store/Application/types";

export interface PaymentsState {
  bulkPaymentFiles: any;
  loadingData: {
    getPaymentById: { isLoading: boolean };
    uploadBulkPaymentFile: { isLoading: boolean };
    getBulkPaymentFiles: { isLoading: boolean };
    processBulkPaymentFile: { isLoading: boolean };
  };
}

export interface BulkPaymentFile {
  fileUploadObject: FileUploadObject;
  numberOfRows: number;
  contents: string;
}

export interface BulkPaymentObject {
  id: string;
  status: string;
  numberOfRows: number;
  name: string;
  createdOn: string;
  downloadUrl: string;
  contents: any;
  processedFileUrl: string;
}

export interface PaymentItem {
  account: string;
  patient: string;
  amount: number;
  currency: string;
  description: string;
}

export interface ProcessBulkPaymentObject {
  collection: string;
  collectionId: string;
  contents: PaymentItem[];
}
