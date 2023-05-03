import { Link } from "react-router-dom";
import styled from "styled-components";

const SetAccount = () => {
  return (
    <Container>
      <p>아직 계정이 없으신가요?</p>
      <Link to={"/signup"}>회원가입</Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  font-size: 14px;
  color: #8f8f8f;

  & a {
    color: #8f8f8f;

    &:hover {
      color: #000;
    }
  }
`;

export default SetAccount;
