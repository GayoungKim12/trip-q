import styled from "styled-components";

interface DestinationProps {
  contents: string[];
}

const Destination = (props: DestinationProps) => {
  const { contents } = props;

  return (
    <Container>
      {contents.map((content, index) => {
        return <Tag key={index}>{`# ${content}`}</Tag>;
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

const Tag = styled.span`
  display: flex;
  align-items: center;
  padding: 0 16px;
  border: 1px solid #38c8b4;
  background-color: #ffffff;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #38c8b4;
`;

export default Destination;
