import { auth } from "@/plugins/firebase";
import { Context } from "@/store/types";
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";

export async function signOut(context: Context) {
  return new Promise<void>((resolve, reject) => {
    auth
      .signOut()
      .then(() => {
        context.commit("setFirebaseUser", undefined);
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export async function userLogin(context: Context, { email, password }: any) {
  return new Promise<void>((resolve, reject) =>
    signInWithEmailAndPassword(auth, email, password)
      .then((firebaseUser: UserCredential) => {
        context.commit("setFirebaseUser", firebaseUser);
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
  );
}

export async function socialLogin(context: Context, website: string) {
  return new Promise<void>((resolve, reject) => {
    switch (website) {
      case "google":
        {
          const provider = new GoogleAuthProvider();

          signInWithPopup(auth, provider)
            .then((firebaseUser: UserCredential) => {
              context.commit("setFirebaseUser", firebaseUser);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }

        break;
      default:
        break;
    }
    return;
  });
}
