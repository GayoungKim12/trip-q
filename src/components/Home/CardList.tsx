import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import { useRecoilState, useRecoilValue } from "recoil";
import postsState from "../../store/postsState";
import filterState from "../../store/filterState";
import { getPostsByFilter } from "../../firebase/getPostsByFilter";
import { getAllPosts } from "../../firebase/getAllPosts";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { INITIAL_FETCH_COUNT } from "../../constants/InitialFetchCount";

const CardList = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const filter = useRecoilValue(filterState);
  const observerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [noMore, setNoMore] = useState(false);

  const getFirstPage = useCallback(async () => {
    try {
      setLoading(true);

      if (filter.content === "") {
        const allPosts = await getAllPosts(null);
        if (allPosts) {
          if (Object.keys(allPosts.result).length !== INITIAL_FETCH_COUNT) {
            setNoMore(true);
          }
          setPosts(allPosts.result);
          setKey(allPosts.lastDoc);
        }
      } else {
        const filterPosts = await getPostsByFilter(filter.content, null);
        if (filterPosts) {
          if (Object.keys(filterPosts.result).length !== INITIAL_FETCH_COUNT) {
            setNoMore(true);
          }
          setPosts(filterPosts.result);
          setKey(filterPosts.lastDoc);
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [filter, setPosts]);

  const loadMore = useCallback(async () => {
    try {
      if (filter.content === "") {
        const allPosts = await getAllPosts(key);
        if (allPosts) {
          if (Object.keys(allPosts.result).length !== INITIAL_FETCH_COUNT) {
            setNoMore(true);
          }
          setPosts((prev) => {
            return { ...prev, ...allPosts.result };
          });
          setKey(allPosts.lastDoc);
        }
      } else {
        const filterPosts = await getPostsByFilter(filter.content, key);
        if (filterPosts) {
          if (Object.keys(filterPosts.result).length !== INITIAL_FETCH_COUNT) {
            setNoMore(true);
          }
          setPosts((prev) => {
            return { ...prev, ...filterPosts.result };
          });
          setKey(filterPosts.lastDoc);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [filter.content, key, setPosts]);

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
    (async () => {
      await getFirstPage();
      window.scrollTo({ top: 0, behavior: "auto" });
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

    // 메모리 해제 작업
    return () => {
      setLoading(false);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [onIntersect, noMore, loading]);

  return (
    <Container>
      {Object.keys(posts).map((pid) => {
        return <Card key={pid} pid={pid} infos={posts[pid]} />;
      })}
      {!noMore && (
        <div className={"observer"} ref={observerRef}>
          Loading
        </div>
      )}
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
`;

export default CardList;
