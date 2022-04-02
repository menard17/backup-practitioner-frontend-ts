const state = {
  appointments: [],
  appointment: undefined,
  loadingData: {
    getAppointments: { isLoading: false },
    getAppointmentById: { isLoading: false },
    populateAppointment: { isLoading: false },
  },
};

export default state;
