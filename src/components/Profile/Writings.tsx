import styled from "styled-components";
import datas from "../../store/datas";
import Card from "../Card/Card";

interface WritingsProps {
  questions: string[];
}

const Writings = (props: WritingsProps) => {
  if (props.questions.length === 0) {
    return (
      <Container>
        <Empty>작성하신 글이 없습니다.</Empty>
      </Container>
    );
  }

  return (
    <Container>
      {props.questions.map((question, index) => {
        return <Card key={index} infos={datas[question]} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
`;

const Empty = styled.p`
  padding: 12px;
  text-align: center;
`;

export default Writings;
