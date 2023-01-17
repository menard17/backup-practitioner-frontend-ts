import { ApplicationState } from "./types";

export function medicalTermsForTests(state: ApplicationState) {
  const medicalTerms = state.medicalTerms["tests"];
  if (!medicalTerms) {
    return [];
  }

  return medicalTerms[0].array;
}

export function medicalTermsForMedications(state: ApplicationState) {
  const medicalTerms = state.medicalTerms["medications"];
  if (!medicalTerms) {
    return [];
  }

  return medicalTerms[0].array;
}
