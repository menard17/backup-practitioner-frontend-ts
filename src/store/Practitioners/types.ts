export interface PractitionerState {
  practitioners: any;
  appointments: any;
  practitioner?: any;
  practitionerRole?: PractitionerRole;
  practitionerRoles: PractitionerRoles;
  loadingData: {
    getPractitionerRoleByPractitionerId: { isLoading: boolean };
    getPractitionerAppointments: { isLoading: boolean };
    getPractitionerRoleById: { isLoading: boolean };
    getPractitioners: { isLoading: boolean };
    getPractitionerById: { isLoading: boolean };
    getAppointments: { isLoading: boolean };
    getPractitionerRoles: { isLoading: boolean };
    updatePractitioner: { isLoading: boolean };
    updatePractitionerStatus: { isLoading: boolean };
  };
}

export type AvailableTime = {
  availableEndTime?: string;
  availableStartTime?: string;
  daysOfWeek: string[];
};

export type PractitionerRole = {
  active: boolean;
  availableTime: AvailableTime[];
  code: any;
  extension: any;
  id: string;
  meta: any;
  period: any;
  practitioner: any;
  practitionerObj: PractitionerObj;
  resourceType: "PractitionerRole";
};

export type PractitionerObj = {
  active: boolean;
  communication: any;
  extension: any;
  gender: "male" | "female";
  id: string;
  meta: any;
  name: any;
  photo: any;
  resourceType: "Practitioner";
  telecom: any;
};

export type PractitionerRoles = PractitionerRole[];
