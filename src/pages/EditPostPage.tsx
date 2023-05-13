import styled from "styled-components";
import EditPostForm from "../components/Post/EditPostForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EditPostPage = () => {
  const { postId } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  if (!postId) return null;

  return (
    <Container>
      <EditPostForm pid={postId} />
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
