import styled from "styled-components";
import UserInformations from "../components/JoinMembership/UserInformations";

const JoinMembershipPage = () => {
  return (
    <Container>
      <Title>회원가입</Title>
      <UserInformations />
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

export default JoinMembershipPage;
