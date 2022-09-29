export function setPatients(state: any, patients: any) {
  state.patients = patients;
}

export function setIsLoading(state: any, { action, value }: any) {
  state.loadingData[action].isLoading = value;
}

export function setPatient(state: any, patient: any) {
  state.patient = patient;
}

export function setAppointments(state: any, appointments: any) {
  state.appointments = appointments;
}

export function setPaymentMethods(state: any, paymentMethods: any) {
  state.paymentMethods = paymentMethods;
}

export function setPaymentIntents(state: any, paymentIntents: any) {
  state.paymentIntents = paymentIntents;
}

export function setDocumentReferences(state: any, documentReferences: any) {
  state.documentReferences = documentReferences;
}

export function setPagination(state: any, pagination: any) {
  state.pagination = pagination;
}

export function setEncounter(state: any, encounter: any) {
  state.encounter = encounter;
}
