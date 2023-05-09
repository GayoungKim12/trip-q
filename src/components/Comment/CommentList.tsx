import { useEffect } from "react";
import { useRecoilState } from "recoil";
import commentsState from "../../store/comments";
import getCommentsByPid from "../../firebase/getCommentsByPid";
import Comment from "./Comment";
import styled from "styled-components";

interface CommentList {
  pid: string;
}

const CommentList = (props: CommentList) => {
  const pid = props.pid;
  const [comments, setComments] = useRecoilState(commentsState);

  useEffect(() => {
    (async () => {
      const datas = await getCommentsByPid(pid, 100);
      if (datas) {
        setComments({ ...datas });
      }
    })();

    return () => {
      setComments({});
    };
  }, [pid, setComments]);

  if (!comments) return null;

  return (
    <Container>
      <Title>Answers</Title>
      {Object.keys(comments).map((commentId) => {
        return <Comment key={commentId} cid={commentId} infos={comments[commentId]} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid #38c8b4;
  border-radius: 16px;
  gap: 8px;
`;

const Title = styled.h2`
  font-family: "Readex Pro", sans-serif;
  text-align: center;
  font-size: 32px;
  color: #38c8b4;
`;

export default CommentList;
