import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface EditProfileButtonProps {
  userId: string;
}

const EditProfileButton = (props: EditProfileButtonProps) => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(`/edit-profile/${props.userId}`)}>회원정보 수정</Button>;
};

const Button = styled.button``;

export default EditProfileButton;
