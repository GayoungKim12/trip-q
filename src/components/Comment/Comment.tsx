import styled from "styled-components";
import { CommentType } from "../../store/comments";
import AnswerArea from "./AnswerArea";
import ProfileArea from "./ProfileArea";
import { useRecoilValue } from "recoil";
import signInUser from "../../store/signInUser";
import CommentButtons from "./CommentButtons";
import EditAnswerForm from "./EditAnswerForm";
import { useState } from "react";
import SaveButton from "../common/SaveButton";

interface CommentProps {
  cid: string;
  infos: CommentType;
}

const Comment = (props: CommentProps) => {
  const { cid, infos } = props;
  const { content, writer, pid, timeStamp } = infos;
  const [showEditForm, setShowEditForm] = useState(false);
  const signInUserState = useRecoilValue(signInUser);

  return (
    <Container>
      {!showEditForm && (
        <AnswerContainer>
          <AnswerArea answer={content} />
          <SaveButton pid={pid} cid={cid} />
        </AnswerContainer>
      )}
      {showEditForm && (
        <EditAnswerForm content={content} cid={props.cid} pid={pid} closeEditForm={() => setShowEditForm(false)} />
      )}
      <Explanation>
        <ProfileArea writer={writer} timeStamp={timeStamp} />
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

const AnswerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

const Explanation = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Comment;
