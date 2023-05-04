import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../../firebase/firebase";

const LogOutButton = () => {
  const navigate = useNavigate();

  const logOutClick = () => {
    authService.signOut();
    const timer = setTimeout(() => {
      clearTimeout(timer);
      navigate("/");
    }, 10);
  };

  return <Button onClick={logOutClick}>로그아웃</Button>;
};

const Button = styled.button``;

export default LogOutButton;
