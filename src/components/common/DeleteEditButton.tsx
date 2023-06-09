import { useEffect, useState } from "react";
import styled from "styled-components";
import { GoKebabHorizontal } from "react-icons/go";
import { BsTrash3 } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useRecoilState } from "recoil";
import signInUser from "../../store/signInUser";
import postsState, { PostsType } from "../../store/postsState";
import deletePostWithComments from "../../firebase/deleteDocWithCollection";
import deleteAllSavedPost from "../../firebase/deleteAllSavedPost";

interface DeleteEditButtonProps {
  pid: string;
  prev?: "post";
}

const DeleteEditButton = (props: DeleteEditButtonProps) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const pid = props.pid;
  const [signInUserState, setSignInUserState] = useRecoilState(signInUser);
  const [posts, setPosts] = useRecoilState(postsState);

  useEffect(() => {
    const clickButtons = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const target = e.target as Element;
      if (target.closest(`.${pid}-edit-and-delete-button`)) return null;

      setShow(false);
    };

    if (show) {
      window.addEventListener("click", clickButtons);
    }

    return () => {
      window.removeEventListener("click", clickButtons);
    };
  }, [show, pid]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(!show);
  };

  const clickDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(false);

    if (!signInUserState) return null;
    const { questions, uid } = signInUserState;
    const newQuestionList = questions.filter((question) => question !== pid);

    setSignInUserState({ ...signInUserState, questions: newQuestionList });
    await deletePostWithComments(pid);

    const userInfosRef = doc(db, "users", uid);
    await updateDoc(userInfosRef, {
      questions: arrayRemove(pid),
    });

    const postIds = Object.keys(posts).filter((postId) => postId !== pid);
    const newPosts: PostsType = {};
    postIds.forEach((postId) => {
      newPosts[postId] = posts[postId];
    });
    setPosts(newPosts);

    if (props.prev === "post") {
      navigate("/");
    }

    await deleteAllSavedPost(pid);
  };

  const clickEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(false);

    navigate(`/edit-post/${pid}`);
  };

  return (
    <Container>
      {show && (
        <Buttons className={`${pid}-edit-and-delete-button`}>
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
      <Button onClick={handleClick} className={`${pid}-edit-and-delete-button`}>
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

export default DeleteEditButton;
