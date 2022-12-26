import { UserCredential } from "firebase/auth";

export function setFirebaseUser(state: any, user: UserCredential) {
  state.firebase.user = user;
}

export const setToken = (state: any, token: string | null) => {
  state.token = token;
};
