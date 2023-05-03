import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth, db } from "./firebase";
import setUserDatabase from "./setUserDatabase";

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = (callback: (str: string) => void) => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      if (result?.user?.email) {
        localStorage.setItem("sign-in-user", `${result?.user?.uid}`);

        db.collection("users")
          .where("email", "==", result.user.email)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0 && result.user?.uid && result.user.email) {
              const userData = {
                email: result.user.email,
                nickname: result.user.email.split("@")[0],
                destinations: {
                  domestic: [],
                  abroad: [],
                },
                selected: 0,
                questions: [],
                saveComments: {},
              };
              setUserDatabase(result.user.uid, userData);
            }
          })
          .catch((error) => {
            console.error(error);
          });

        callback("/");
      }
    })
    .catch((error) => {
      // 로그인 실패 시 처리할 코드
      console.log(error);
      alert("실패");
    });
};
