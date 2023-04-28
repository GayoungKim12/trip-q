import Answer from "./Answer";
import Destination from "./Destination";
import Question from "./Question";

interface CardBodyProps {
  destination: string[];
  question: string;
  answer: string | null;
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
