import { AuthState } from "./types";

export const isSendingPasswordResetLink = (state: AuthState): boolean => {
  return state.loading.isSendingPasswordResetLink;
};

export const showEmailSentToast = (state: AuthState): boolean => {
  return state.flags.showEmailSentToast;
};
