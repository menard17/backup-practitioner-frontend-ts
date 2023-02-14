import { UserCredential } from "firebase/auth";
import { AuthState } from "./types";

export function setFirebaseUser(state: AuthState, user: UserCredential) {
  state.firebase.user = user;
}

export const setToken = (state: AuthState, token: string | null) => {
  state.token = token;
};

export const setShowEmailSentToast = (state: AuthState, value: boolean) => {
  state.flags.showEmailSentToast = value;
};

export const setIsSendingPasswordResetLink = (
  state: AuthState,
  loading: boolean
) => {
  state.loading.isSendingPasswordResetLink = loading;
};
