import { useEffect, useState } from "react";
import styled from "styled-components";
import { GoKebabHorizontal } from "react-icons/go";
import { BsTrash3 } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useRecoilState } from "recoil";
import signInUser from "../../store/signInUser";

interface DeleteEditButtonProps {
  qid: string;
}

const DeleteEditButton = (props: DeleteEditButtonProps) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const qid = props.qid;
  const [signInUserState, setSignInUserState] = useRecoilState(signInUser);

  useEffect(() => {
    const clickButtons = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      console.log(e.target);

      const target = e.target as Element;
      if (target.closest(`.${qid}-edit-and-delete-button`)) return null;

      setShow(false);
    };

    if (show) {
      window.addEventListener("click", clickButtons);
    }

    return () => {
      window.removeEventListener("click", clickButtons);
    };
  }, [show, qid]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(true);
  };

  const clickDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(false);

    if (!signInUserState) return null;
    const { email, nickname, destinations, selected, questions, saveComments, uid } = signInUserState;
    const newQuestionList = questions.filter((question) => question !== qid);

    await deleteDoc(doc(db, "posts", qid));
    setSignInUserState({ ...signInUserState, questions: newQuestionList });

    const userInfosRef = doc(db, "users", signInUserState.uid);
    await setDoc(userInfosRef, {
      uid,
      email,
      nickname,
      destinations,
      selected,
      questions: newQuestionList,
      saveComments,
    });
  };

  const clickEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(false);

    navigate(`/edit-post/${qid}`);
  };

  return (
    <Container>
      {show && (
        <Buttons className={`${qid}-edit-and-delete-button`}>
          <DeleteButton onClick={clickDelete}>
            <BsTrash3 />
            삭제하기
          </DeleteButton>
          <EditButton onClick={clickEdit}>
            <FiEdit />
            수정하기
          </EditButton>
        </Buttons>
      )}
      <Button onClick={handleClick} className={`${qid}-edit-and-delete-button`}>
        <GoKebabHorizontal />
      </Button>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  margin-right: 8px;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  font-size: 24px;
  color: #8f8f8f;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &
`;

const Buttons = styled.div`
  position: absolute;
  left: -125px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 120px;
  height: 80px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    height: 32px;
    width: 110px;
    border-radius: 8px;
    font-size: 14px;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 300;

    & > svg {
      font-size: 16px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const DeleteButton = styled.button`
  color: red;
`;
const EditButton = styled.button`
  position: relative;
  color: #000000;

  &::before {
    content: "";
    width: 100px;
    height: 1px;
    position: absolute;
    top: -4.5px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default DeleteEditButton;
