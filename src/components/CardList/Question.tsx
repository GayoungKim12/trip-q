import styled from "styled-components";

interface QuestionProps {
  content: string;
}

const Question = (props: QuestionProps) => {
  const { content } = props;

  return (
    <Container>
      <AlphabetQ>Q</AlphabetQ>
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
  border: 1px solid #38c8b4;
  border-radius: 8px;
  padding: 2px 12px;
`;

const AlphabetQ = styled.span`
  font-family: "Readex Pro", sans-serif;
  font-size: 40px;
  font-weight: 600;
  color: #38c8b4;
`;

const Content = styled.span``;

export default Question;
