import styled from "styled-components";
import LogInMethods from "../components/LogIn/LogInMethods";
import { useEffect } from "react";

const LogInPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <Container>
      <Title>로그인</Title>
      <LogInMethods />
    </Container>
  );
};

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
`;

export default LogInPage;
