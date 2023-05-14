import { useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { useSetRecoilState } from "recoil";
import signInUser from "./store/signInUser";
import { authService } from "./firebase/firebase";
import { getUserInfos } from "./firebase/getUserInfos";

function App() {
  const setSignInUserState = useSetRecoilState(signInUser);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        const infos = await getUserInfos(user.uid);
        setSignInUserState({
          uid: user.uid,
          email: infos?.email,
          nickname: infos?.nickname,
          image: infos?.image,
          destinations: infos?.destinations,
          selected: infos?.selected,
          questions: infos?.questions,
        });
      }
    });
  }, [setSignInUserState]);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
