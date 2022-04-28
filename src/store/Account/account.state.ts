const state = {
  practitioner: undefined,
  practitionerRole: undefined,
  user: undefined,
  loadingData: {
    getCurrentUser: { isLoading: false },
    updateMyPractitionerRole: { isLoading: false },
    createMyPractitionerWithPractitionerRole: { isLoading: false },
  },
};

export default state;
