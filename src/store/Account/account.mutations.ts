export function setPractitioner(state: any, practitioner: any) {
  state.practitioner = practitioner;
}

export function setIsLoading(state: any, { action, value }: any) {
  state.loadingData[action].isLoading = value;
}

export function setPractitionerRole(state: any, practitionerRole: any) {
  state.practitionerRole = practitionerRole;
}

export function setIsPractitioner(state: any, value: any) {
  state.isPractitioner = value;
}

export function setUser(state: any, user: any) {
  state.user = user;
}
