import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostAndComment from "../components/Comment/PostAndComment";
import { useEffect } from "react";

const PostAndCommentPage = () => {
  const { postId } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  if (!postId) return null;

  return (
    <Container>
      <PostAndComment pid={postId} />
    </Container>
  );
};

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export default PostAndCommentPage;
