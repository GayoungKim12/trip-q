import styled from "styled-components";
import CommentCard from "./CommentCard";

interface CommentsProps {
  comments: {
    [key: string]: string[];
  };
}

const Comments = (props: CommentsProps) => {
  if (Object.keys(props.comments).length === 0) {
    return (
      <Container>
        <Empty>보관한 답변이 없습니다.</Empty>
      </Container>
    );
  }

  return (
    <Container>
      {Object.keys(props.comments).map((question) => {
        return <CommentCard questionId={question} commentIds={props.comments[question]} key={question} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Empty = styled.p`
  padding: 12px;
  text-align: center;
`;

export default Comments;
