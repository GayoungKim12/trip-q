import styled from "styled-components";
import CommentCard from "./CommentCard";
import signInUser from "../../store/signInUser";
import { useRecoilValue } from "recoil";
import { useCallback, useEffect, useRef, useState } from "react";
import getSavedComments from "../../firebase/getSavedComments";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { INITIAL_FETCH_COUNT } from "../../constants/InitialFetchCount";

const Comments = () => {
  const signInUserState = useRecoilValue(signInUser);
  const [comments, setComments] = useState<{
    [key: string]: string[];
  }>({});
  const observerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [noMore, setNoMore] = useState(false);
  const [notSaveComments, setNotSaveComments] = useState(false);

  const getFirstPage = useCallback(async () => {
    try {
      if (!signInUserState) return;
      setLoading(true);

      const saveComments = await getSavedComments(signInUserState.uid, null);
      if (saveComments) {
        if (Object.keys(saveComments.result).length === 0) {
          setNotSaveComments(true);
        }
        if (Object.keys(saveComments.result).length !== INITIAL_FETCH_COUNT) {
          setNoMore(true);
        }
        setComments(saveComments.result);
        setKey(saveComments.lastDoc);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [signInUserState, setComments]);

  const loadMore = useCallback(async () => {
    try {
      if (!signInUserState) return;
      const saveComments = await getSavedComments(signInUserState.uid, key);
      if (saveComments) {
        if (Object.keys(saveComments.result).length !== INITIAL_FETCH_COUNT) {
          setNoMore(true);
        }
        setComments((prev) => {
          return { ...prev, ...saveComments.result };
        });
        setKey(saveComments.lastDoc);
      }
    } catch (err) {
      console.log(err);
    }
  }, [signInUserState, setComments, key]);

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

  if (notSaveComments) {
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
      {!noMore && (
        <div className={"observer"} ref={observerRef}>
          <Image src="/loader.gif" />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Empty = styled.p`
  padding: 12px;
  text-align: center;
`;

const Image = styled.img`
  width: 120px;
  object-fit: cover;
`;

export default Comments;
