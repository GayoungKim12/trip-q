import styled from "styled-components";
import { signInWithGoogle } from "../../firebase/signInWithGoogle";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    signInWithGoogle(navigate);
  };

  return (
    <Button onClick={handleClick}>
      <GoogleIcon>
        <FcGoogle />
      </GoogleIcon>
      Google로 로그인
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 16px 0;
  width: 320px;
  height: 60px;
  border: 1px solid #8f8f8f;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  color: #8f8f8f;
`;

const GoogleIcon = styled.span`
  display: flex;
  line-height: 28px;
  font-size: 28px;
`;

export default GoogleLoginButton;
