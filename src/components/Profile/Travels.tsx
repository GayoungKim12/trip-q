import styled from "styled-components";

interface TravelsProps {
  destinations: {
    domestic: string[];
    abroad: string[];
  };
}

const Travels = (props: TravelsProps) => {
  const { domestic, abroad } = props.destinations;

  return (
    <Container>
      {domestic.length && (
        <Travel>
          <Standard>국내:</Standard>
          <Visited>{domestic.join(", ")}</Visited>
        </Travel>
      )}
      {abroad.length && (
        <Travel>
          <Standard>해외:</Standard>
          <Visited>{abroad.join(", ")}</Visited>
        </Travel>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const Travel = styled.div`
  display: flex;
  gap: 8px;
`;

const Standard = styled.span`
  color: #8f8f8f;
`;

const Visited = styled.div`
  display: flex;
  gap: 4px;
`;

export default Travels;
