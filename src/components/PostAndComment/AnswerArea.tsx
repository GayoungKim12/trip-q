import styled from "styled-components";

interface AnswerAreaProps {
  answer: string;
}

const AnswerArea = (props: AnswerAreaProps) => {
  const { answer } = props;

  return (
    <Container>
      <Main>
        <AlphabetA>A</AlphabetA>
        <Answer>{answer}</Answer>
      </Main>
    </Container>
  );
};

const Container = styled.div`
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
`;

const Answer = styled.p`
  font-size: 16px;
`;

const AlphabetA = styled.span`
  margin-top: -4px;
  font-family: "Readex Pro", sans-serif;
  font-size: 42px;
  font-weight: 600;
  color: #8f8f8f;
  line-height: 50px;
`;

export default AnswerArea;
