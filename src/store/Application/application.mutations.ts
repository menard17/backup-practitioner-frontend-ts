import { ApplicationState, Loading, Template } from "@/store/Application/types";

export function setTemplates(state: ApplicationState, templates: Template[]) {
  state.templates = templates;
}

export function setIsLoading(state: any, { action, value }: any) {
  state.loadingData[action].isLoading = value;
}
