import styled from "styled-components";
import { WriterType } from "./CardList";

interface CardHeadProps {
  writer: WriterType;
  date: string;
}

const CardHead = (props: CardHeadProps) => {
  const { writer, date } = props;

  return (
    <Container>
      <ImageContainer>
        <Image src={writer.image} alt={`${writer.id}의 프로필 사진`} />
      </ImageContainer>
      <Descriptions>
        <NickName>{writer.nickname}</NickName>
        <Date>{date}</Date>
      </Descriptions>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #b5b5b5;
  overflow: hidden;
`;

const Image = styled.img`
  width: 90%;
  border-radius: 50%;
`;

const Descriptions = styled.div`
  display: flex;
  flex-direction: column;
`;

const NickName = styled.span`
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  color: #8f8f8f;
`;

export default CardHead;
