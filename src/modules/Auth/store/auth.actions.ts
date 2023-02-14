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
  sendPasswordResetEmail,
} from "firebase/auth";
import { LoginParams, RegisterParams } from "./types";

export async function signOut(context: Context) {
  localStorage.removeItem("token");
  context.commit("setToken", null);
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

export const login = async (
  context: Context,
  { email, password }: LoginParams
) => {
  try {
    const firebaseUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    context.commit("setFirebaseUser", firebaseUser);

    const idToken = await auth.currentUser?.getIdTokenResult(true);

    context.commit("setToken", idToken?.token);
  } catch (err: any) {
    console.log(err.message);
  }
};

export async function userLogin(
  context: Context,
  { email, password }: LoginParams
) {
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
  { email, password, firstName, lastName }: RegisterParams
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

export async function forgotPassword(context: Context, email: string) {
  context.commit("setIsSendingPasswordResetLink", true);
  await sendPasswordResetEmail(auth, email);
  context.commit("setShowEmailSentToast", true);
  context.commit("setIsSendingPasswordResetLink", false);
}

export function setToken(context: Context, token: string) {
  localStorage.setItem("token", token);
  context.commit("setToken", token);
}
