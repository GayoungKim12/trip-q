import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import LogInPage from "../../pages/LogInPage";
import JoinMembershipPage from "../../pages/JoinMembershipPage";
import CardList from "../CardList/CardList";
import ProfilePage from "../../pages/ProfilePage";
import users from "../../store/users";

const Main = () => {
  return (
    <Container>
      <Routes>
        <Route path={"/"} element={<CardList />} />
        <Route path={"/login"} element={<LogInPage />} />
        <Route path={"/join-membership"} element={<JoinMembershipPage />} />
        <Route path={"/profile/:userId"} element={<ProfilePage />} />
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
