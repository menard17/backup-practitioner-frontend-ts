import { ApplicationState } from "@/store/Application/types";

const state: ApplicationState = {
  templates: [],
  loadingData: {
    getTemplates: { isLoading: false },
  },
};

export default state;
