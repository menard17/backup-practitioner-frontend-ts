const state = {
  appointments: [],
  appointment: undefined,
  encounter: undefined,
  diagnosticReports: undefined,
  slots: [],
  loadingData: {
    createAppointment: { isLoading: false },
    getAppointments: { isLoading: false },
    getAppointmentsByPractitionerId: { isLoading: false },
    getAppointmentById: { isLoading: false },
    populateAppointment: { isLoading: false },
    createEncounter: { isLoading: false },
    getEncounter: { isLoading: false },
    updateEncounter: { isLoading: false },
    createDiagnosticReport: { isLoading: false },
    getSlotsByPractitionerRoleId: { isLoading: false },
    createSlot: { isLoading: false },
    freeSlot: { isLoading: false },
  },
};

export default state;
