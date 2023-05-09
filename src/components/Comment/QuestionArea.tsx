import styled from "styled-components";
import Destination from "./Destination";

interface QuestionAreaProps {
  destination: string[];
  question: string;
}

const QuestionArea = (props: QuestionAreaProps) => {
  const { destination, question } = props;

  return (
    <Container>
      <Main>
        <AlphabetQ>Q</AlphabetQ>
        <Question>{question}</Question>
      </Main>
      <Destination contents={destination} />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
`;

const Main = styled.div`
  display: flex;
  align-items: start;
  gap: 12px;
  margin-bottom: 8px;
`;

const Question = styled.p`
  font-size: 18px;
  margin-top: 8px;
`;

const AlphabetQ = styled.span`
  margin-top: -4px;
  font-family: "Readex Pro", sans-serif;
  font-size: 50px;
  font-weight: 600;
  color: #38c8b4;
  line-height: 50px;
`;

export default QuestionArea;
