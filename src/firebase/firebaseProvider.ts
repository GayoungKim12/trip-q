import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import auth from "./firebase";

// GoogleAuthProvider 객체 생성
const provider = new firebase.auth.GoogleAuthProvider();

// Google 로그인 함수
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      // 로그인 성공 시 처리할 코드
      console.log(result);
      alert("성공");
    })
    .catch((error) => {
      // 로그인 실패 시 처리할 코드
      console.log(error);
      alert("실패");
    });
};
