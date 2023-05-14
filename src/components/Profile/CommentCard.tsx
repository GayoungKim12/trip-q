import styled from "styled-components";
import Question from "../common/Question";
import Answer from "../common/Answer";
import { useEffect, useState } from "react";
import Destination from "../common/Destination";
import getSavedCommentsContents from "../../firebase/getSavedCommentsContents";

interface CommentCardProps {
  pid: string;
  cids: string[];
}

const CommentCard = (props: CommentCardProps) => {
  const { pid, cids } = props;
  const [question, setQuestion] = useState("");
  const [destination, setDestination] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await getSavedCommentsContents(pid, cids);
      if (result) {
        setLoading(false);
        setQuestion(result.question);
        setDestination(result.destination);
        setAnswers(result.answers);
      }
    })();
  }, [pid, cids]);

  return (
    <Container>
      <Destination contents={destination} />
      <Question content={question} />
      {loading
        ? cids.map((_, idx) => {
            return <Answer content={""} key={idx} />;
          })
        : Object.keys(answers).map((answer) => {
            return <Answer content={answers[answer]} key={answer} cid={answer} pid={pid} />;
          })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 16px 16px;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #b6b6b6;
`;

export default CommentCard;
