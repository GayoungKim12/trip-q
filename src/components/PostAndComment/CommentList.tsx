import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import commentsState from "../../store/comments";
import getCommentsByPid from "../../firebase/getCommentsByPid";
import Comment from "./Comment";
import styled from "styled-components";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { INITIAL_FETCH_COUNT } from "../../constants/InitialFetchCount";

interface CommentList {
  pid: string;
}

const CommentList = (props: CommentList) => {
  const pid = props.pid;
  const [comments, setComments] = useRecoilState(commentsState);
  const observerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [noMore, setNoMore] = useState(false);

  const getFirstPage = useCallback(async () => {
    try {
      setLoading(true);

      const comments = await getCommentsByPid(pid, null);
      if (comments) {
        if (Object.keys(comments.result).length !== INITIAL_FETCH_COUNT) {
          setNoMore(true);
        }
        setComments(comments.result);
        setKey(comments.lastDoc);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [pid, setComments]);

  const loadMore = useCallback(async () => {
    try {
      const comments = await getCommentsByPid(pid, key);
      if (comments) {
        if (Object.keys(comments.result).length !== INITIAL_FETCH_COUNT) {
          setNoMore(true);
        }
        setComments((prev) => {
          return { ...prev, ...comments.result };
        });
        setKey(comments.lastDoc);
      }
    } catch (err) {
      console.log(err);
    }
  }, [pid, setComments, key]);

  const onIntersect = useCallback(
    async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        await loadMore();
      }
    },
    [loadMore]
  );

  useEffect(() => {
    setComments({});
    window.scrollTo({ top: 0, behavior: "auto" });
    (async () => {
      await getFirstPage();
      setNoMore(false);
    })();
  }, [getFirstPage, setComments]);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (observerRef.current && !noMore) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      if (loading) {
        observer.unobserve(observerRef.current);
      } else {
        observer.observe(observerRef.current);
      }
    }

    return () => {
      setLoading(false);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [onIntersect, noMore, loading]);

  if (!comments) return null;

  return (
    <Container>
      <Title>Answers</Title>
      {!Object.keys(comments).length && (
        <Container>
          <Empty>작성된 답변이 없습니다.</Empty>
        </Container>
      )}
      {Object.keys(comments).map((commentId) => {
        return <Comment key={commentId} cid={commentId} infos={comments[commentId]} />;
      })}
      {!noMore && (
        <div className={"observer"} ref={observerRef}>
          <Image src="/loader.gif" />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Empty = styled.p`
  padding: 12px;
  text-align: center;
  color: #8f8f8f;
`;

const Image = styled.img`
  width: 120px;
  object-fit: cover;
`;

export default CommentList;
