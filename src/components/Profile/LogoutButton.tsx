import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../../firebase/firebase";
import signInUser from "../../store/signInUser";
import { useSetRecoilState } from "recoil";

const LogOutButton = () => {
  const navigate = useNavigate();
  const setSignInUserState = useSetRecoilState(signInUser);

  const logOutClick = async () => {
    await authService.signOut();
    setSignInUserState(null);

    navigate("/");
  };

  return <Button onClick={logOutClick}>로그아웃</Button>;
};

const Button = styled.button`
  &:hover {
    color: #000000;
  }
`;

export default LogOutButton;
