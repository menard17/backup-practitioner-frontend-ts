export function setPractitioners(state: any, practitioners: any) {
  state.practitioners = practitioners;
}

export function setIsLoading(state: any, { action, value }: any) {
  state.loadingData[action].isLoading = value;
}

export function setPractitioner(state: any, practitioner: any) {
  state.practitioner = practitioner;
}

export function setPractitionerRole(state: any, practitionerRole: any) {
  state.practitionerRole = practitionerRole;
}

export function setPractitionerRoles(state: any, practitionerRoles: any) {
  state.practitionerRoles = practitionerRoles;
}

export function setAppointments(state: any, appointments: any) {
  state.appointments = appointments;
}
