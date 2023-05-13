import styled from "styled-components";
import { destinations } from "../../constants/Destinations";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import userInfosState from "../../store/userInfosState";
import editUserInfosState from "../../store/editUserInfosState";

interface SelectDestinationModalProps {
  type: "new" | "edit";
  standard: "국내" | "해외";
  closeModal: () => void;
}

interface DestinationType {
  big: "국내" | "해외" | "선택";
  middle: string;
  small: string;
}

const SelectDestinationModal = (props: SelectDestinationModalProps) => {
  const bigStandard = Object.keys(destinations);
  const setUserInfos = useSetRecoilState(userInfosState);
  const setEditUserInfos = useSetRecoilState(editUserInfosState);
  const [destination, setDestination] = useState<DestinationType>({
    big: props.standard ? props.standard : "선택",
    middle: "선택",
    small: "선택",
  });

  let middleStandard, smallStandard;
  if (destination.big !== "선택") {
    middleStandard = Object.keys(destinations[destination.big]);
    if (destination.middle !== "선택") {
      smallStandard = destinations[destination.big][destination.middle];
    }
  }

  const AddDestinations = (type: "domestic" | "abroad", country: string) => {
    if (props.type === "new") {
      setUserInfos((prevUserInfos) => {
        const newUserInfos = {
          ...prevUserInfos,
          destinations: {
            ...prevUserInfos.destinations,
            [type]: [...prevUserInfos.destinations[type], country],
          },
        };
        return newUserInfos;
      });
    } else {
      setEditUserInfos((prevUserInfos) => {
        const newUserInfos = {
          ...prevUserInfos,
          destinations: {
            ...prevUserInfos.destinations,
            [type]: [...prevUserInfos.destinations[type], country],
          },
        };
        return newUserInfos;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, key: "big" | "middle" | "small") => {
    const newDestination = { ...destination };
    const value = e.target.value;

    if (key === "big" && (value === "국내" || value === "해외" || value === "선택")) {
      newDestination[key] = value;
    } else if (key === "middle" || key === "small") {
      newDestination[key] = value;
    }

    setDestination(newDestination);
  };

  const handleAddButton = (e: React.MouseEvent) => {
    e.preventDefault();

    const destinationString =
      destination.small === "전체" ? `${destination.middle}` : `${destination.middle} ${destination.small}`;

    if (destinationString.includes("선택")) return alert("여행지를 끝까지 선택해주세요.");

    if (destination.big === "국내") {
      AddDestinations("domestic", destinationString);
    } else if (destination.big === "해외") {
      AddDestinations("abroad", destinationString);
    }
    props.closeModal();
  };

  const handleCacelButton = (e: React.MouseEvent) => {
    e.preventDefault();
    props.closeModal();
  };

  return (
    <Box>
      <Container>
        <Top>
          <Request>여행지를 선택해주세요.</Request>
          <SelectArea>
            <Select onChange={(e) => handleChange(e, "big")} disabled={props.standard ? true : false}>
              {props.standard ? (
                <Option>{props.standard}</Option>
              ) : (
                <>
                  <Option>{"선택"}</Option>
                  {bigStandard.map((standard) => {
                    return (
                      <Option key={standard} value={standard}>
                        {standard}
                      </Option>
                    );
                  })}
                </>
              )}
            </Select>
            <Select onChange={(e) => handleChange(e, "middle")}>
              <Option>{"선택"}</Option>
              {middleStandard?.map((standard) => {
                return (
                  <Option key={standard} value={standard}>
                    {standard}
                  </Option>
                );
              })}
            </Select>
            <Select onChange={(e) => handleChange(e, "small")}>
              <Option>{"선택"}</Option>
              {smallStandard?.map((standard, index) => {
                return (
                  <Option key={`${standard}_${index}`} value={standard}>
                    {standard}
                  </Option>
                );
              })}
            </Select>
          </SelectArea>
        </Top>
        <Buttons>
          <CancelButton onClick={handleCacelButton}>취소하기</CancelButton>
          <AddButton onClick={handleAddButton}>추가하기</AddButton>
        </Buttons>
      </Container>
    </Box>
  );
};

const Box = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 28px;
  width: 90%;
  max-width: 560px;
  height: 240px;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

const Top = styled.div``;

const Request = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const SelectArea = styled.div`
  display: flex;
  margin-top: 24px;
  gap: 8px;
`;

const Select = styled.select`
  padding-left: 2px;
  padding-right: 16px;
  border-radius: 8px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
`;

const Option = styled.option`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
`;

const Buttons = styled.div`
  text-align: right;
  button {
    padding: 8px 12px;
    width: 120px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const CancelButton = styled.button`
  border: 1px solid #8f8f8f;
  color: #8f8f8f;
`;

const AddButton = styled.button`
  margin-left: 8px;
  border: 1px solid #38c8b4;
  background-color: #38c8b4;
  color: #ffffff;

  &:hover {
    background-color: #45b8ab;
  }
`;

export default SelectDestinationModal;
