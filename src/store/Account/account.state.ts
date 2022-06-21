import { AccountState } from "./types";

const state: AccountState = {
  practitioner: undefined,
  practitionerRole: undefined,
  user: undefined,
  firebaseRole: "",
  loadingData: {
    getCurrentUser: { isLoading: false },
    getCurrentUserRole: { isLoading: false },
    updateMyPractitionerRole: { isLoading: false },
    createMyPractitionerWithPractitionerRole: { isLoading: false },
  },
};

export default state;
