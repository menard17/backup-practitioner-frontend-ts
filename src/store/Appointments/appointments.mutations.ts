export function setAppointments(state: any, appointments: any) {
  state.appointments = appointments;
}

export function setAppointmentStatus(state: any, status: string) {
  state.appointment["status"] = status;
}

export function setIsLoading(state: any, { action, value }: any) {
  state.loadingData[action].isLoading = value;
}

export function setAppointment(state: any, appointment: any) {
  state.appointment = appointment;
}

export function setClinicalNote(state: any, clinicalNote: any) {
  state.clinicalNote = clinicalNote;
}

export function setEncounter(state: any, encounter: any) {
  state.encounter = encounter;
}

export function setDiagnosticReports(state: any, diagnosticReports: any) {
  state.diagnosticReports = diagnosticReports;
}

export function setSlots(state: any, slots: any) {
  state.slots = slots;
}

export function setMedications(state: any, medications: any) {
  state.medications = medications;
}

export function setTest(state: any, test: any) {
  state.test = test;
}

export function setError(state: any, value: any) {
  state.error = value;
}
