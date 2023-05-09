import { useState } from "react";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import signInUser from "../../store/signInUser";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { unavailableUser } from "../../util/unavailableUser";
import { useNavigate } from "react-router-dom";
import setCommentDatabase from "../../firebase/setCommentDatabase";
import commentsState from "../../store/comments";
import { setId } from "../../util/setId";

interface WriteCommentProps {
  pid: string;
}

const CommentForm = (props: WriteCommentProps) => {
  const pid = props.pid;
  const [comment, setComment] = useState("");
  const setComments = useSetRecoilState(commentsState);
  const signInUserState = useRecoilValue(signInUser);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    if (e.target.value.length > 1000) {
      setComment(e.target.value.slice(0, 1000));
      return;
    }
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signInUserState) {
      return unavailableUser(navigate);
    }

    setComment("");

    if (!comment.length) return;

    const uid = signInUserState.uid;
    const { id, date } = setId("c", uid);
    const commentInfos = {
      [id]: {
        content: comment,
        writer: uid,
        date,
        selected: 0,
        pid: pid,
      },
    };

    await setCommentDatabase(pid, id, commentInfos);

    setComments((prev) => {
      return { ...commentInfos, ...prev };
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea placeholder="댓글을 입력해 주세요." value={comment} onChange={handleChange}></Textarea>
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
  min-width: 360px;
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  padding: 16px;
  width: 100%;
  height: 80px;
  font-size: 14px;
  border-radius: 16px 16px 0 0;
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
  border-radius: 0 0 16px 16px;
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
  border-radius: 0 0 16px 0;
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

export default CommentForm;
