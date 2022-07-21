import { ApplicationState } from "@/store/Application/types";

const state: ApplicationState = {
  templates: [],
  emailSent: false,
  sheetAdded: false,
  loadingData: {
    getTemplates: { isLoading: false },
    callLogicApp: { isLoading: false },
  },
};

export default state;
