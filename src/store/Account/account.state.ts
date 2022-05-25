const state = {
  practitioner: undefined,
  practitionerRole: undefined,
  user: undefined,
  isPractitioner: false,
  loadingData: {
    getCurrentUser: { isLoading: false },
    getCurrentUserRole: { isLoading: false },
    updateMyPractitionerRole: { isLoading: false },
    createMyPractitionerWithPractitionerRole: { isLoading: false },
  },
};

export default state;
