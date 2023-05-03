import styled from "styled-components";
import { useParams } from "react-router-dom";
import EditProfile from "../components/EditProfile/EditProfile";

const EditUserInfosPage = () => {
  const { userId } = useParams();

  if (!userId) return <>없는 페이지입니다.</>;

  return (
    <Container>
      <Title>회원정보 수정</Title>
      <EditProfile userId={userId} />
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

export default EditUserInfosPage;
