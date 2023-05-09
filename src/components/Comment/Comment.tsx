import styled from "styled-components";
import { CommentType } from "../../store/comments";
import AnswerArea from "./AnswerArea";
import ProfileArea from "./ProfileArea";
import { useRecoilValue } from "recoil";
import signInUser from "../../store/signInUser";
import CommentButtons from "./CommentButtons";
import EditAnswerForm from "./EditAnswerForm";
import { useState } from "react";

interface CommentProps {
  cid: string;
  infos: CommentType;
}

const Comment = (props: CommentProps) => {
  const { content, date, writer, pid } = props.infos;
  const [showEditForm, setShowEditForm] = useState(false);
  const signInUserState = useRecoilValue(signInUser);

  return (
    <Container>
      {!showEditForm && <AnswerArea answer={content} />}
      {showEditForm && (
        <EditAnswerForm content={content} cid={props.cid} pid={pid} closeEditForm={() => setShowEditForm(false)} />
      )}
      <Explanation>
        <ProfileArea writer={writer} date={date} />
        {writer === signInUserState?.uid && (
          <CommentButtons pid={pid} cid={props.cid} showEditForm={() => setShowEditForm(true)} />
        )}
      </Explanation>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  padding: 14px 16px 12px;
  width: 100%;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #8f8f8f;
  border-radius: 16px;
  background-color: #ffffff;
`;

const Explanation = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Comment;
