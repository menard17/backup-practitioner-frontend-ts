import { AuthState } from "./types";

const state: AuthState = {
  firebase: {
    user: undefined,
  },
  loading: {
    isSendingPasswordResetLink: false,
  },
  flags: {
    showEmailSentToast: false,
  },
  token: localStorage.getItem("token"),
};

export default state;
