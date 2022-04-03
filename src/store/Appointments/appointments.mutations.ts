export function setAppointments(state: any, appointments: any) {
  state.appointments = appointments;
}

export function setIsLoading(state: any, { action, value }: any) {
  state.loadingData[action].isLoading = value;
}

export function setAppointment(state: any, appointment: any) {
  state.appointment = appointment;
}

export function setEncounter(state: any, encounter: any) {
  state.encounter = encounter;
}

export function setDiaognosticReport(state: any, diagnosticReport: any) {
  state.diagnosticReport = diagnosticReport;
}
