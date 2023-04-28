import styled from "styled-components";

interface DestinationProps {
  contents: string[];
}

const Destination = (props: DestinationProps) => {
  const { contents } = props;

  return (
    <Container>
      {contents.map((content, index) => {
        return <Span key={index}>{content}</Span>;
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

const Span = styled.span`
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #38c8b4;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #fff;
`;

export default Destination;
