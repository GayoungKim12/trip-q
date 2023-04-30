import styled from "styled-components";
import CommentCard from "./CommentCard";

interface CommentsProps {
  comments: {
    [key: string]: string[];
  };
}

const Comments = (props: CommentsProps) => {
  return (
    <Container>
      {Object.keys(props.comments).map((question) => {
        return (
          <CommentCard
            questionId={question}
            commentIds={props.comments[question]}
            key={question}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default Comments;
