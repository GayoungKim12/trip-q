import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import signInUser from "../../store/signInUser";
import { unavailableUser } from "../../util/unavailableUser";

const PostButton = () => {
  const navigate = useNavigate();
  const signInUserState = useRecoilValue(signInUser);

  return (
    <Button
      onClick={() => {
        if (!signInUserState) {
          unavailableUser(navigate);
        } else {
          navigate("/post");
        }
      }}
    >
      <BsPlusLg />
    </Button>
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 12%;
  right: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #ffffff;
  font-size: 24px;
  color: #959595;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.3);
`;

export default PostButton;
