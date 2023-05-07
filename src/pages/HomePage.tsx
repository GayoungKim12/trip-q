import styled from "styled-components";
import CardList from "../components/Home/CardList";
import PostButton from "../components/Home/PostButton";

const HomePage = () => {
  return (
    <Container>
      <CardList />
      <PostButton />
    </Container>
  );
};

const Container = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1024px;
  gap: 16px;
`;

export default HomePage;
