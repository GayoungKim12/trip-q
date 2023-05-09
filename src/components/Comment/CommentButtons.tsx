import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { arrayRemove, deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { BsTrash3 } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { GoKebabHorizontal } from "react-icons/go";
import commentsState, { CommentsType } from "../../store/comments";

interface CommentButtonsProps {
  pid: string;
  cid: string;
  showEditForm: () => void;
}

const CommentButtons = (props: CommentButtonsProps) => {
  const { pid, cid } = props;
  const [show, setShow] = useState(false);
  const setComments = useSetRecoilState(commentsState);

  useEffect(() => {
    const clickButtons = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const target = e.target as Element;
      if (target.closest(`.${cid}-edit-and-delete-button`)) {
        return null;
      }
      setShow(false);
    };

    if (show) {
      window.addEventListener("click", clickButtons);
    }

    return () => {
      window.removeEventListener("click", clickButtons);
    };
  }, [show, cid]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(!show);
  };

  const clickDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(false);

    const commentRef = doc(db, "comments", pid);
    await updateDoc(commentRef, {
      [cid]: deleteField(),
    });

    const postRef = doc(db, "posts", pid);
    await updateDoc(postRef, {
      comments: arrayRemove(cid),
    });

    setComments((prev) => {
      const newComments: CommentsType = {};
      Object.keys(prev).forEach((commentId) => {
        if (commentId !== cid) {
          return (newComments[commentId] = prev[commentId]);
        }
      });

      return newComments;
    });
  };

  const clickEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(false);

    props.showEditForm();
  };

  return (
    <Container>
      {show && (
        <Buttons className={`${cid}-edit-and-delete-button`}>
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
      <Button onClick={handleClick} className={`${cid}-edit-and-delete-button`}>
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
  z-index: 20;

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
    font-weight: 400;

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

export default CommentButtons;
