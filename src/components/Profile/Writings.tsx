import styled from "styled-components";
import Card from "../Card/Card";
import { useCallback, useEffect, useRef, useState } from "react";
import postsState from "../../store/postsState";
import { getPostsByUid } from "../../firebase/getPostsByUid";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { INITIAL_FETCH_COUNT } from "../../constants/InitialFetchCount";
import { useRecoilState } from "recoil";

interface WritingsProps {
  userId: string;
  questions: string[];
}

const Writings = (props: WritingsProps) => {
  const [posts, setPosts] = useRecoilState(postsState);
  const observerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [noMore, setNoMore] = useState(false);

  const getFirstPage = useCallback(async () => {
    try {
      setLoading(true);

      const posts = await getPostsByUid(props.userId, null);
      if (posts) {
        if (Object.keys(posts.result).length !== INITIAL_FETCH_COUNT) {
          setNoMore(true);
        }
        setPosts(posts.result);
        setKey(posts.lastDoc);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [props.userId, setPosts]);

  const loadMore = useCallback(async () => {
    try {
      const posts = await getPostsByUid(props.userId, key);
      if (posts) {
        if (Object.keys(posts.result).length !== INITIAL_FETCH_COUNT) {
          setNoMore(true);
        }
        setPosts((prev) => {
          return { ...prev, ...posts.result };
        });
        setKey(posts.lastDoc);
      }
    } catch (err) {
      console.log(err);
    }
  }, [props.userId, key, setPosts]);

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
    setPosts({});
    window.scrollTo({ top: 0, behavior: "auto" });
    (async () => {
      await getFirstPage();
      setNoMore(false);
    })();
  }, [getFirstPage, setPosts]);

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

  if (!posts) return null;

  if (props.questions.length === 0) {
    return (
      <Container>
        <Empty>작성하신 글이 없습니다.</Empty>
      </Container>
    );
  }

  return (
    <Container>
      {Object.keys(posts).map((qid) => {
        return <Card key={qid} pid={qid} infos={posts[qid]} />;
      })}
      {!noMore && (
        <div className={"observer"} ref={observerRef}>
          Loading
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
`;

const Empty = styled.p`
  padding: 12px;
  text-align: center;
`;

export default Writings;
