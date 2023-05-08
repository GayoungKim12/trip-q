import styled from "styled-components";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import { PostContentType } from "../../store/postContent";
import signInUser from "../../store/signInUser";
import { useRecoilValue } from "recoil";
import DeleteEditButton from "../common/DeleteEditButton";

interface CardProps {
  pid: string;
  infos: PostContentType;
}

const Card = (props: CardProps) => {
  const { writer, date, destination, question, bestComment } = props.infos;
  const signInUserState = useRecoilValue(signInUser);

  return (
    <Container>
      <Top>
        <CardHead writer={writer} date={date} />
        {writer.uid === signInUserState?.uid && <DeleteEditButton pid={props.pid} />}
      </Top>
      <CardBody destination={destination} question={question} answer={bestComment ? bestComment : null} />
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
  border: 1px solid #b6b6b6;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MoreComments = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: #8f8f8f;
  cursor: pointer;

  &:hover {
    color: #000000;
  }
`;

export default Card;
