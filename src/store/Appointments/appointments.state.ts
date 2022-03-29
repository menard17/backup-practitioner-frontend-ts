const state = {
  appointments: [],
  appointment: undefined,
  loadingData: {
    getAppointments: { isLoading: false },
    getAppointmentById: { isLoading: false },
  },
};

export default state;
