import styled from "styled-components";
import Tag from "../common/Tag";

interface DestinationProps {
  contents: string[];
}

const Destination = (props: DestinationProps) => {
  const { contents } = props;

  return (
    <Container>
      {contents.map((content, index) => {
        return <Tag key={index} content={content} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

export default Destination;
