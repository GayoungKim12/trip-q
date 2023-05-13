import styled from "styled-components";
import PostForm from "../components/Post/PostForm";
import { useEffect } from "react";

const PostPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <Container>
      <PostForm />
    </Container>
  );
};

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export default PostPage;
