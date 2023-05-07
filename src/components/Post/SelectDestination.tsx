import styled from "styled-components";
import Modal from "./Modal";
import { useState } from "react";
import postContent from "../../store/postContents";
import { useRecoilValue } from "recoil";
import Tag from "../common/Tag";

const SelectDestination = () => {
  const [modal, setModal] = useState(false);
  const postContentState = useRecoilValue(postContent);

  const handleModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setModal(true);
  };

  return (
    <Container>
      {modal && <Modal closeModal={() => setModal(false)} />}
      <Label>여행지</Label>
      <SelectedDestination>
        {postContentState.destination.map((content, idx) => {
          return <Tag content={content} key={`${content}_${idx}`} />;
        })}
      </SelectedDestination>
      <Button onClick={handleModal}>선택하기</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #8f8f8f;
  font-weight: 500;
  font-size: 18px;
`;

const SelectedDestination = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Button = styled.button`
  margin-top: 8px;
  padding: 12px;
  background-color: #38c8b4;
  border-radius: 8px;
  width: 100px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;

  &:hover {
    background-color: #45b8ab;
  }
`;

export default SelectDestination;
