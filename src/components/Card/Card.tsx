import styled from "styled-components";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import { PostContentType } from "../../store/postContent";
import signInUser from "../../store/signInUser";
import { useRecoilValue } from "recoil";
import DeleteEditButton from "../common/DeleteEditButton";
import { useNavigate } from "react-router-dom";
import { unavailableUser } from "../../util/unavailableUser";
import { useEffect, useState } from "react";
import getBestComment from "../../firebase/getBestComment";

interface CardProps {
  pid: string;
  infos: PostContentType;
}

const Card = (props: CardProps) => {
  const { writer, destination, question, comment, timeStamp } = props.infos;
  const signInUserState = useRecoilValue(signInUser);
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (comment) {
      (async () => {
        const result = await getBestComment(props.pid);
        if (result) {
          setAnswer(result);
        }
      })();
    } else {
      setAnswer(null);
    }
  }, [comment, props.pid]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!signInUserState) {
      unavailableUser(navigate);
    } else {
      navigate(`/post/${props.pid}`);
    }
  };

  return (
    <Container>
      <Top>
        <CardHead writer={writer} timeStamp={timeStamp} />
        {writer === signInUserState?.uid && <DeleteEditButton pid={props.pid} />}
      </Top>
      <CardBody destination={destination} question={question} answer={answer} />
      <MoreComments>
        <Span onClick={handleClick}>댓글 더보기...</Span>
      </MoreComments>
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

const MoreComments = styled.div`
  margin-left: 8px;
`;

const Span = styled.span`
  font-size: 14px;
  color: #8f8f8f;
  cursor: pointer;

  &:hover {
    color: #000000;
  }
`;

export default Card;
