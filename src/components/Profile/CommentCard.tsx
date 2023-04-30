import styled from "styled-components";
import Question from "../common/Question";
import datas from "../../store/datas";
import Answer from "../common/Answer";

interface CommentCardProps {
  questionId: string;
  commentIds: string[];
}

const CommentCard = (props: CommentCardProps) => {
  const question = datas[props.questionId].question;

  return (
    <Container>
      <Question content={question} />
      {props.commentIds.map((commentId) => {
        return <Answer content={commentId} key={commentId} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #b6b6b6;
`;

export default CommentCard;
