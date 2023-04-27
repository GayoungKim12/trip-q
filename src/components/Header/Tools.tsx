import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Tools = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Search type="text" placeholder="여행지를 입력해주세요." />
      <Login onClick={() => navigate("/login")}>로그인</Login>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
`;

const Search = styled.input`
  padding: 0 12px;
  width: calc(100% - 68px);
  height: 36px;
  border: none;
  border-radius: 6px;
  background-color: #e7e6e6;

  &::placeholder {
    color: #8f8f8f;
    font-family: "Noto Sans KR";
  }
`;

const Login = styled.button`
  width: 60px;
  padding: 4px;
  color: #8f8f8f;
  font-family: "Noto Sans KR";
`;

export default Tools;
