import styled from "styled-components";
import CommentCard from "./CommentCard";
import signInUser from "../../store/signInUser";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import getSavedComments from "../../firebase/getSavedComments";

/* interface CommentsProps {
  comments: {
    [key: string]: string[];
  };
} */

const Comments = () => {
  const signInUserState = useRecoilValue(signInUser);
  const [comments, setComments] = useState<{
    [key: string]: string[];
  } | null>(null);

  useEffect(() => {
    if (!signInUserState) return;
    (async () => {
      const result = await getSavedComments(signInUserState.uid, null);
      if (result) {
        setComments(result);
      }
    })();
  }, [signInUserState]);

  if (comments === null) return <>Loading...</>;
  if (Object.keys(comments).length === 0) {
    return (
      <Container>
        <Empty>보관한 답변이 없습니다.</Empty>
      </Container>
    );
  }

  return (
    <Container>
      {Object.keys(comments).map((postId) => {
        return <CommentCard pid={postId} cids={comments[postId]} key={postId} />;
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
