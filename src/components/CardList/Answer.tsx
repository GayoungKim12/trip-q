import styled from "styled-components";

interface AnswerProps {
  content: string;
}

const Answer = (props: AnswerProps) => {
  const { content } = props;

  return (
    <Container>
      <AlphabetA>A</AlphabetA>
      <Content>{content}</Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #8f8f8f;
  border-radius: 8px;
  padding: 2px 12px;
`;

const AlphabetA = styled.span`
  font-family: "Readex Pro", sans-serif;
  font-size: 40px;
  font-weight: 600;
  color: #8f8f8f;
`;

const Content = styled.span``;

export default Answer;
