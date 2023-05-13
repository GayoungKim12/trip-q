import styled from "styled-components";
import SignUp from "../components/SignUpForm/SignUp";
import { useEffect } from "react";

const SignUpPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <Container>
      <Title>회원가입</Title>
      <SignUp />
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

export default SignUpPage;
