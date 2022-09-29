const state = {
  patients: [],
  appointments: [],
  paymentMethods: [],
  documentReferences: [],
  paymentIntents: [],
  patient: undefined,
  encounter: undefined,
  loadingData: {
    populatePatient: { isLoading: false },
    getPatients: { isLoading: false },
    updatePatient: { isLoading: false },
    getPatientById: { isLoading: false },
    getAppointments: { isLoading: false },
    getPaymentMethods: { isLoading: false },
    getPaymentIntents: { isLoading: false },
    getDocumentReferences: { isLoading: false },
    getEncounterByAppointmentId: { isLoading: false },
  },
  pagination: {
    pageSize: 15,
    isNextDisabled: true,
    isPrevDisabled: true,
    currentLinkUrl: undefined,
    nextLinkUrl: undefined,
    urlStack: [],
  },
};

export default state;
