import { PractitionerState } from "./types";

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

type setPractitionerRoleStatusParam = {
  roleId: string;
  status: boolean;
};

export function setPractitionerRoleStatus(
  state: PractitionerState,
  { roleId, status }: setPractitionerRoleStatusParam
) {
  state.practitionerRole!.active = status;
  state.practitioner.active = status;
  const objIndex = state.practitionerRoles.findIndex((obj) => obj.id == roleId);
  const obj = state.practitionerRoles[objIndex];
  obj.active = status;
  obj.practitionerObj.active = status;
  state.practitionerRoles = [
    ...state.practitionerRoles.slice(0, objIndex),
    obj,
    ...state.practitionerRoles.slice(objIndex + 1),
  ];
}
