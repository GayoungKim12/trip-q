import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface EditProfileButton {
  userId: string;
}

const EditProfileButton = (props: EditProfileButton) => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(`/edit-profile/${props.userId}`)}>회원정보 수정</Button>;
};

const Button = styled.button`
  position: absolute;
  top: -16px;
  right: 24px;
  text-align: right;
  font-size: 12px;
  color: #8f8f8f;
`;

export default EditProfileButton;
