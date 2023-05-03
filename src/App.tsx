import { RecoilRoot } from "recoil";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  return (
    <RecoilRoot>
      <Header />
      <Main />
    </RecoilRoot>
  );
}

export default App;
