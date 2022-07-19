import { updatePractitionerStatus } from "@/store/Practitioners/practitioners.actions";

const state = {
  practitioners: [],
  appointments: [],
  practitioner: undefined,
  practitionerRole: undefined,
  practitionerRoles: [],
  loadingData: {
    getPractitionerRoleByPractitionerId: { isLoading: false },
    getPractitionerAppointments: { isLoading: false },
    getPractitionerRoleById: { isLoading: false },
    getPractitioners: { isLoading: false },
    getPractitionerById: { isLoading: false },
    getAppointments: { isLoading: false },
    getPractitionerRoles: { isLoading: false },
    updatePractitioner: { isLoading: false },
    updatePractitionerStatus: { isLoading: false },
  },
};

export default state;
