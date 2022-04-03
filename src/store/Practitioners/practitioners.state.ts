const state = {
  practitioners: [],
  appointments: [],
  practitioner: undefined,
  practitionerRole: undefined,
  loadingData: {
    getPractitionerRoleByPractitionerId: { isLoading: false },
    getPractitionerRoleById: { isLoading: false },
    getPractitioners: { isLoading: false },
    getPractitionerById: { isLoading: false },
    getAppointments: { isLoading: false },
  },
};

export default state;
