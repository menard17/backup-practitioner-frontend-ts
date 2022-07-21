import { ApplicationState, Template } from "@/store/Application/types";

export function setTemplates(state: ApplicationState, templates: Template[]) {
  state.templates = templates;
}

export function setIsLoading(state: any, { action, value }: any) {
  state.loadingData[action].isLoading = value;
}

export function setEmailSent(state: ApplicationState, value: boolean) {
  state.emailSent = value;
}

export function setSheet(state: ApplicationState, value: boolean) {
  state.sheetAdded = value;
}
