import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase/firebase";
import styled from "styled-components";
import EditUserInfosForm from "./EditUserInfosForm";
import { useRecoilState } from "recoil";
import editUserInfosState, { EditUserInfosType } from "../../store/editUserInfosState";

interface EditProfileProps {
  userId: string;
}

const EditProfile = (props: EditProfileProps) => {
  const userId = props.userId;
  const [editUserInfos, setEditUserInfos] = useRecoilState(editUserInfosState);

  useEffect(() => {
    if (!userId) return;

    const getUserInfos = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const prev = docSnap.data();
        const prevUserInfos: EditUserInfosType = {
          email: prev.email,
          nickname: prev.nickname,
          destinations: prev.destinations,
          selected: prev.selected,
          questions: prev.questions,
          saveComments: prev.saveComments,
        };

        setEditUserInfos(prevUserInfos);
      }
    };

    getUserInfos();
  }, [setEditUserInfos, userId]);

  if (!editUserInfos.email) return <>NOT USER</>;

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
