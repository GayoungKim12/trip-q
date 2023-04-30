import styled from "styled-components";
import datas from "../../store/datas";
import Card from "../common/Card";

interface WritingsProps {
  questions: string[];
}

const Writings = (props: WritingsProps) => {
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

export default Writings;
