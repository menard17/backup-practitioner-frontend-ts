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
