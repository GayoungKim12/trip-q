import styled from "styled-components";

interface TravelsProps {
  destinations: {
    domestic: string[];
    abroad: string[];
  };
}

const Travels = (props: TravelsProps) => {
  console.log(props.destinations);
  const { domestic, abroad } = props.destinations;

  return (
    <Container>
      <Travel>
        <Standard>국내:</Standard>
        {domestic.length !== 0 ? <Visited>{domestic.join(", ")}</Visited> : <Standard>없음</Standard>}
      </Travel>
      <Travel>
        <Standard>해외:</Standard>
        {abroad.length !== 0 ? <Visited>{abroad.join(", ")}</Visited> : <Standard>없음</Standard>}
      </Travel>
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
