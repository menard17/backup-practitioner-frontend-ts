import { AccountState } from "./types";

const state: AccountState = {
  practitioner: undefined,
  practitionerRole: undefined,
  user: undefined,
  firebaseRole: "",
  accounts: [],
  loadingData: {
    getCurrentUser: { isLoading: false },
    getCurrentUserRole: { isLoading: false },
    updateMyPractitionerRole: { isLoading: false },
    createMyPractitionerWithPractitionerRole: { isLoading: false },
    getAccounts: { isLoading: false },
  },
};

export default state;
