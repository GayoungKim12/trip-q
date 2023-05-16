import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import commentsState from "../../store/comments";
import { updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

interface EditAnswerFormProps {
  cid: string;
  pid: string;
  content: string;
  closeEditForm: () => void;
}

const EditAnswerForm = (props: EditAnswerFormProps) => {
  const { cid, pid, content, closeEditForm } = props;
  const [comment, setComment] = useState(content);
  const [comments, setComments] = useRecoilState(commentsState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setComments({ ...comments, [cid]: { ...comments[cid], content: comment } });

    const postRef = db.collection("posts").doc(pid);
    const commentRef = postRef.collection("comments").doc(cid);
    await updateDoc(commentRef, {
      ["content"]: comment,
    });

    closeEditForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea placeholder="댓글을 입력해 주세요." value={comment} onChange={handleChange} />
      <ButtonArea>
        <WordNumber>{comment.length} / 1000자</WordNumber>
        <Button className={comment.length ? "active" : "disabled"}>
          <IoSend />
        </Button>
      </ButtonArea>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  padding: 16px;
  width: 100%;
  height: 80px;
  font-size: 14px;
  font-family: "Noto Sans KR", sans-serif;
  border-radius: 12px 12px 0 0;
  border: 1px solid #8f8f8f;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  resize: none;

  &::placeholder {
    color: #959595;
  }

  &:focus {
    outline: none;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 0 0 12px 12px;
  border: 1px solid #8f8f8f;
  border-top: none;
`;

const WordNumber = styled.span`
  margin-left: 16px;
  font-size: 12px;
  color: #8f8f8f;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 36px;
  border-radius: 0 0 12px 0;
  font-size: 14px;
  color: #ffffff;

  &.active {
    background-color: #38c8b4;
  }

  &.disabled {
    background-color: #b6b6b6;
    cursor: default;
  }
`;

export default EditAnswerForm;
