import {
  ApplicationState,
  MedicalTerm,
  Template,
} from "@/store/Application/types";

interface setMedicalTermParam {
  type: string;
  medicalTerms: MedicalTerm[];
}

export function setTemplates(state: ApplicationState, templates: Template[]) {
  state.templates = templates;
}

export function setMedicalTerms(
  state: ApplicationState,
  { type, medicalTerms }: setMedicalTermParam
) {
  state.medicalTerms[type] = medicalTerms;
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

export function setFileUploadProgress(state: ApplicationState, value: number) {
  state.fileUploadProgress = value;
}

export function showNotification(state: ApplicationState, value: any) {
  state.snackbar.text = value.text;
  state.snackbar.type = value.type;
}

export function toggleLoadingOverlay(state: ApplicationState, value: any) {
  state.loadingOverlay = value;
}
