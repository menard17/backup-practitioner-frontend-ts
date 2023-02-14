import { UserCredential } from "firebase/auth";

export interface AuthState {
  firebase: {
    user: UserCredential | undefined;
  };
  loading: {
    isSendingPasswordResetLink: boolean;
  };
  flags: {
    showEmailSentToast: boolean;
  };
  token: string | null;
}

export interface RegisterParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginParams {
  email: string;
  password: string;
}
