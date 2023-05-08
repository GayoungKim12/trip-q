import styled from "styled-components";
import Tag from "../common/Tag";
import PlusTag from "../common/PlusTag";
import SelectDestinationModal from "../common/SelectDestinationModal";
import { useEffect, useState } from "react";
import userInfosState from "../../store/userInfosState";
import { useRecoilState } from "recoil";

type ModalStandardType = "" | "국내" | "해외";

const TravelPlaces = () => {
  const [userInfos, setUserInfos] = useRecoilState(userInfosState);
  const [{ domestic, abroad }, setDestinations] = useState(userInfos.destinations);
  const [modal, setModal] = useState<ModalStandardType>("");
  const [deleteDestination, setDeleteDestination] = useState({
    type: "",
    destination: "",
  });

  useEffect(() => {
    setDestinations(userInfos.destinations);
  }, [userInfos]);

  useEffect(() => {
    const type = deleteDestination.type;
    if (type === "domestic" || type === "abroad") {
      setUserInfos((prev) => {
        const newDestinations = { ...prev.destinations };
        newDestinations[type] = newDestinations[type].filter((des) => {
          return des !== deleteDestination.destination;
        });
        return { ...prev, destinations: newDestinations };
      });
    }
  }, [deleteDestination, setUserInfos]);

  return (
    <>
      <Place>
        <Span>{"방문한 국내 여행지(최대 5개)"}</Span>
        <Container>
          {domestic.map((country) => {
            return (
              <Tag
                key={country}
                content={country}
                onDelete={(destination) => setDeleteDestination({ type: "domestic", destination })}
              />
            );
          })}
          {domestic.length !== 5 && <PlusTag onClick={() => setModal("국내")} />}
        </Container>
      </Place>
      <Place>
        <Span>{"방문한 해외 여행지(최대 5개)"}</Span>
        <Container>
          {abroad.map((country) => {
            return (
              <Tag
                key={country}
                content={country}
                onDelete={(destination) => setDeleteDestination({ type: "abroad", destination })}
              />
            );
          })}
          {abroad.length !== 5 && <PlusTag onClick={() => setModal("해외")} />}
        </Container>
      </Place>
      {modal !== "" && <SelectDestinationModal type={"new"} closeModal={() => setModal("")} standard={modal} />}
    </>
  );
};

const Place = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  gap: 12px;
`;

export default TravelPlaces;
