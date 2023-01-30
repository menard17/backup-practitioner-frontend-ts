const state = {
  appointments: [],
  appointment: undefined,
  encounter: undefined,
  diagnosticReports: undefined,
  clinicalNote: undefined,
  test: undefined,
  medications: undefined,
  slots: [],
  error: "",
  loadingData: {
    createAppointment: { isLoading: false },
    updateAppointment: { isLoading: false },
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
    createClinicalNote: { isLoading: false },
    getClinicalNote: { isLoading: false },
    createMedications: { isLoading: false },
    getMedications: { isLoading: false },
    createTest: { isLoading: false },
    getTest: { isLoading: false },
    callPatient: { isLoading: false },
  },
};

export default state;
