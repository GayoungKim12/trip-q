import styled from "styled-components";
import Tag from "../common/Tag";
import PlusTag from "../common/PlusTag";
import SelectDestinationModal from "../SelectDestinationModal/SelectDestinationModal";
import { useState } from "react";
import { DestinationsType } from "../../store/userInfoState";

interface TravelPlacesProps {
  destinations: DestinationsType;
}

type ModalStandardType = "" | "국내" | "해외";

const TravelPlaces = (props: TravelPlacesProps) => {
  const { domestic, abroad } = props.destinations;
  const [modal, setModal] = useState<ModalStandardType>("");

  return (
    <>
      <Place>
        <Span>{"방문한 국내 여행지(최대 5개)"}</Span>
        <Container>
          {domestic.map((country) => {
            return <Tag key={country} content={country} />;
          })}
          {domestic.length !== 5 && <PlusTag onClick={() => setModal("국내")} />}
        </Container>
      </Place>
      <Place>
        <Span>{"방문한 해외 여행지(최대 5개)"}</Span>
        <Container>
          {abroad.map((country) => {
            return <Tag key={country} content={country} />;
          })}
          {abroad.length !== 5 && <PlusTag onClick={() => setModal("해외")} />}
        </Container>
      </Place>
      {modal !== "" && <SelectDestinationModal closeModal={() => setModal("")} standard={modal} />}
    </>
  );
};

const Place = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 280px;
`;

const Span = styled.span`
  margin-left: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #8f8f8f;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

export default TravelPlaces;
