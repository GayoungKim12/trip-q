import styled from "styled-components";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <Container>
      <SignUpForm />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 20px 0;

  & label {
    margin-left: 8px;
  }
`;

export default SignUp;
