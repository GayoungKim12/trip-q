import styled from "styled-components";
import { DataType } from "./CardList";
import CardHead from "./CardHead";
import CardBody from "./CardBody";

interface CardProps {
  infos: DataType;
}

const Card = (props: CardProps) => {
  const { writer, date, destination, question, bestComment } = props.infos;

  return (
    <Container>
      <CardHead writer={writer} date={date} />
      <CardBody
        destination={destination}
        question={question}
        answer={bestComment ? bestComment : null}
      />
      <MoreComments>댓글 더보기...</MoreComments>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  padding: 16px;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #b5b5b5;
`;

const MoreComments = styled.div`
  margin-left: 8px;
  font-size: 14px;
  color: #8f8f8f;
`;

export default Card;
