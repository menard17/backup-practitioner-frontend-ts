const state = {
  patients: [],
  appointments: [],
  patient: undefined,
  loadingData: {
    getPatients: { isLoading: false },
    getPatientById: { isLoading: false },
    getAppointments: { isLoading: false },
  },
};

export default state;
