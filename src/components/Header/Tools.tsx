import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Tools = () => {
  const navigate = useNavigate();
  const signInUser = localStorage.getItem("sign-in-user");

  console.log(signInUser);

  return (
    <Container>
      <Search type="text" placeholder="여행지를 입력해주세요." />
      {signInUser ? (
        <Link to={`/profile/${signInUser}`}>
          <ImageContainer>
            <Image src={"https://via.placeholder.com/100x100"} alt={`${signInUser}의 프로필 사진`} />
          </ImageContainer>
        </Link>
      ) : (
        <Login onClick={() => navigate("/login")}>로그인</Login>
      )}
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

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #b6b6b6;
  overflow: hidden;
`;

const Image = styled.img`
  width: 90%;
  border-radius: 50%;
`;

const Search = styled.input`
  padding: 0 12px;
  width: calc(100% - 68px);
  height: 36px;
  border: none;
  border-radius: 6px;
  background-color: #e4e4e4;

  &::placeholder {
    color: #8f8f8f;
    font-family: "Noto Sans KR";
  }
`;

const Login = styled.button`
  width: 60px;
  padding: 4px;
  color: #8f8f8f;
  font-weight: 500;
  font-family: "Noto Sans KR";
`;

export default Tools;
