import styled from "styled-components";
import { useEffect } from "react";
import Card from "../Card/Card";
import { getPosts } from "../../firebase/getPosts";
import { useRecoilState } from "recoil";
import postsState from "../../store/postsState";
import { CARD_NUMBER_IN_PAGE } from "../../constants/CardNumberInPage";

const CardList = () => {
  const [posts, setPosts] = useRecoilState(postsState);

  useEffect(() => {
    (async () => {
      const datas = await getPosts(CARD_NUMBER_IN_PAGE);
      if (!datas) return;
      setPosts(datas);
    })();
  }, [setPosts]);

  if (!posts) return null;

  return (
    <Container>
      {Object.keys(posts).map((pid) => {
        return <Card key={pid} pid={pid} infos={posts[pid]} />;
      })}
    </Container>
  );
};

const Container = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
`;

export default CardList;
