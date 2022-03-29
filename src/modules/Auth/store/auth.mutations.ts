import { UserCredential } from "firebase/auth";

export function setFirebaseUser(state: any, user: UserCredential) {
  state.firebase.user = user;
}
