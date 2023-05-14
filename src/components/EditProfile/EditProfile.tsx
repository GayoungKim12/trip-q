import { useEffect } from "react";
import styled from "styled-components";
import EditUserInfosForm from "./EditUserInfosForm";
import { useRecoilState, useRecoilValue } from "recoil";
import editUserInfosState from "../../store/editUserInfosState";
import signInUser from "../../store/signInUser";

interface EditProfileProps {
  userId: string;
}

const EditProfile = (props: EditProfileProps) => {
  const userId = props.userId;
  const [editUserInfos, setEditUserInfos] = useRecoilState(editUserInfosState);
  const signInUserState = useRecoilValue(signInUser);

  useEffect(() => {
    if (!userId) return;
    if (!signInUserState) return;

    const { email, nickname, image, destinations, selected, questions } = signInUserState;
    setEditUserInfos({
      email,
      nickname,
      image,
      destinations,
      selected,
      questions,
    });
  }, [setEditUserInfos, userId, signInUserState]);

  if (!editUserInfos.email) return <>Loading...</>;

  return (
    <Container>
      <EditUserInfosForm userId={userId} />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 20px 0;

  & label {
    margin-left: 8px;
  }
`;

export default EditProfile;
