const state = {
  appointments: [],
  encounters: [],
  medications: [],
  tests: [],
  loadingData: {
    getAppointmentsByPatientId: { isLoading: false },
    getEncountersByPatientId: { isLoading: false },
    getMedicationsByPatientId: { isLoading: false },
    getTestsByPatientId: { isLoading: false },
  },
};

export default state;
