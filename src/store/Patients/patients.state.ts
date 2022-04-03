const state = {
  patients: [],
  appointments: [],
  paymentMethods: [],
  documentReferences: [],
  patient: undefined,
  loadingData: {
    populatePatient: { isLoading: false },
    getPatients: { isLoading: false },
    getPatientById: { isLoading: false },
    getAppointments: { isLoading: false },
    getPaymentMethods: { isLoading: false },
    getPaymentIntents: { isLoading: false },
    getDocumentReferences: { isLoading: false },
  },
};

export default state;
