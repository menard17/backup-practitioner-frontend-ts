import { auth } from "@/plugins/firebase";
import { Context } from "@/store/types";
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
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

export async function userRegister(
  context: Context,
  { email, password, firstName, lastName }: any
) {
  return new Promise<void>((resolve, reject) =>
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (firebaseUser: UserCredential) => {
        await sendEmailVerification(firebaseUser.user)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.log("Email could not be sent");
            console.log(error);
          });
        await updateProfile(firebaseUser.user, {
          displayName: `${firstName} ${lastName}`,
        });
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
