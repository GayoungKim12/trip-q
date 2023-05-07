import styled from "styled-components";
import EditPostForm from "../components/Post/EditPostForm";
import { useParams } from "react-router-dom";

const EditPostPage = () => {
  const { questionId } = useParams();

  if (!questionId) return null;

  return (
    <Container>
      <EditPostForm qid={questionId} />
    </Container>
  );
};

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export default EditPostPage;
