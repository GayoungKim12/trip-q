import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import LogInPage from "../../pages/LogInPage";
import ProfilePage from "../../pages/ProfilePage";
import SignUpPage from "../../pages/SignUpPage";
import SuccessSignUpPage from "../../pages/SuccessSignUpPage";
import EditUserInfosPage from "../../pages/EditUserInfosPage";
import HomePage from "../../pages/HomePage";
import PostPage from "../../pages/PostPage";

const Main = () => {
  return (
    <Container>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/post"} element={<PostPage />} />
        <Route path={"/login"} element={<LogInPage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
        <Route path={"/signup/success"} element={<SuccessSignUpPage />} />
        <Route path={"/profile/:userId"} element={<ProfilePage />} />
        <Route path={"/edit-profile/:userId"} element={<EditUserInfosPage />} />
        <Route path={"/edit-post/:userId"} element={<EditUserInfosPage />} />
      </Routes>
    </Container>
  );
};

const Container = styled.div`
  margin: 64px auto 40px;
  padding: 32px 16px;
  max-width: 1024px;
  width: 100%;
`;

export default Main;
