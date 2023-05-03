import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import EditUserInfosInputs from "./EditUserInfosInputs";
import EditTravelPlaces from "./EditTravelPlaces";
import { useRecoilValue } from "recoil";
import editUserInfosState from "../../store/editUserInfosState";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

interface EditUserInfosFormProps {
  userId: string;
}

const EditUserInfosForm = (props: EditUserInfosFormProps) => {
  const navigate = useNavigate();
  const editUserInfos = useRecoilValue(editUserInfosState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userInfosRef = doc(db, "users", props.userId);
    setDoc(userInfosRef, editUserInfos);

    navigate(`/profile/${props.userId}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <EditUserInfosInputs />
      <EditTravelPlaces />
      <Button>수정하기</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Button = styled.button`
  margin-top: 24px;
  padding: 0 12px;
  width: 320px;
  height: 60px;
  background-color: #38c8b4;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;

  &:hover {
    background-color: #45b8ab;
  }
`;

export default EditUserInfosForm;