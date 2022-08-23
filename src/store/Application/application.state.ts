import { ApplicationState } from "@/store/Application/types";

const state: ApplicationState = {
  templates: [],
  medicalTerms: {},
  emailSent: false,
  sheetAdded: false,
  fileUploadProgress: 0,
  loadingOverlay: false,
  snackbar: {
    text: "",
    type: "",
  },
  loadingData: {
    getTemplates: { isLoading: false },
    getMedicalTerms: { isLoading: false },
    callLogicApp: { isLoading: false },
    uploadFileToFirebaseStorage: { isLoading: false },
    processBulkPaymentFile: { isLoading: false },
  },
};

export default state;
