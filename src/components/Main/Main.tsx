import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import LogInPage from "../../pages/LogInPage";
import JoinMembershipPage from "../../pages/JoinMembershipPage";
import CardList from "../CardList/CardList";

const Main = () => {
  return (
    <Container>
      <Routes>
        <Route path={"/"} element={<CardList />} />
        <Route path={"/login"} element={<LogInPage />} />
        <Route path={"/join-membership"} element={<JoinMembershipPage />} />
      </Routes>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  padding: 32px 16px;
  max-width: 1024px;
  width: 100%;
`;

export default Main;
