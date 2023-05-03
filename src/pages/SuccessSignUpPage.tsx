import styled from "styled-components";
import userInfosState from "../store/userInfosState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

const SuccessSignUpPage = () => {
  const userInfos = useRecoilValue(userInfosState);
  const navigate = useNavigate();

  return (
    <Container>
      <Success>{userInfos.nickname}님, 회원가입에 성공했습니다.</Success>
      <Button onClick={() => navigate("/")}>메인으로</Button>
    </Container>
  );
};

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 28px;
  width: 720px;
  gap: 20px;
  border: 1px solid #38c8b4;
  border-radius: 16px;
`;

const Success = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #38c8b4;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;

  &:hover {
    background-color: #45b8ab;
  }
`;

export default SuccessSignUpPage;
