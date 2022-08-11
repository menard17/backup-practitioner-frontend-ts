import { ApplicationState } from "@/store/Application/types";

const state: ApplicationState = {
  templates: [],
  medicalTerms: {},
  emailSent: false,
  sheetAdded: false,
  loadingData: {
    getTemplates: { isLoading: false },
    getMedicalTerms: { isLoading: false },
    callLogicApp: { isLoading: false },
  },
};

export default state;
