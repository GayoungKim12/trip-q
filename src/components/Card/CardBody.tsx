import Answer from "../common/Answer";
import Destination from "../common/Destination";
import Question from "../common/Question";

interface CardBodyProps {
  destination: string[];
  question: string;
  answer: null | string;
}

const CardBody = (props: CardBodyProps) => {
  const { destination, question, answer } = props;

  return (
    <>
      <Destination contents={destination} />
      <Question content={question} />
      {answer && <Answer content={answer} />}
    </>
  );
};

export default CardBody;
