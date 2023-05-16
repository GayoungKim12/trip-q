import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth, db } from "./firebase";
import setUserDatabase from "./setUserDatabase";

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async (callback: (str: string) => void) => {
  try {
    const result = await auth.signInWithPopup(provider);
    if (result?.user?.email) {
      const querySnapshot = await db.collection("users").where("email", "==", result.user.email).get();
      if (querySnapshot.size === 0 && result.user?.uid && result.user.email) {
        const userData = {
          email: result.user.email,
          nickname: result.user.email.split("@")[0],
          image: "",
          destinations: {
            domestic: [],
            abroad: [],
          },
          questions: [],
        };

        setUserDatabase(result.user.uid, userData);
      }
      callback("/");
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error && "code" in error) {
      if (error.code === "auth/popup-closed-by-user") {
        return;
      } else {
        console.error(error);
      }
    } else {
      console.error(error);
    }
  }
};
