import styled from "styled-components";
import SaveButton from "./SaveButton";

interface AnswerProps {
  content: string;
  cid?: string;
  pid?: string;
}

const Answer = (props: AnswerProps) => {
  const { content, cid, pid } = props;

  return (
    <Container>
      <Left>
        <AlphabetA>A</AlphabetA>
        <Content>{content}</Content>
      </Left>
      <Right>{cid && pid && <SaveButton cid={cid} pid={pid} />}</Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #8f8f8f;
  border-radius: 8px;
  padding: 2px 12px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const Right = styled.div``;

const AlphabetA = styled.span`
  font-family: "Readex Pro", sans-serif;
  font-size: 40px;
  font-weight: 600;
  color: #8f8f8f;
`;

const Content = styled.span`
  color: black;
`;
export default Answer;
