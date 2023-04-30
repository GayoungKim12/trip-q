import styled from "styled-components";
import Card from "../common/Card";
import datas from "../../store/datas";

const CardList = () => {
  return (
    <Container>
      {Object.values(datas).map((data) => {
        return <Card key={data.id} infos={data} />;
      })}
    </Container>
  );
};

const Container = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
`;

export default CardList;
