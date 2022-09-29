export function setIsLoading(state: any, { action, value }: any) {
  state.loadingData[action].isLoading = value;
}

export function setAppointments(state: any, appointments: any) {
  state.appointments = appointments;
}

export function setEncounters(state: any, encounters: any) {
  state.encounters = encounters;
}

export function setMedications(state: any, medications: any) {
  state.medications = medications;
}

export function setTests(state: any, tests: any) {
  state.tests = tests;
}
