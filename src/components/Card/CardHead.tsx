import styled from "styled-components";
import { Link } from "react-router-dom";
import { WriterType } from "../../store/datas";

interface CardHeadProps {
  writer: WriterType;
  date: string;
}

const CardHead = (props: CardHeadProps) => {
  const { writer, date } = props;

  return (
    <Container>
      <Link to={`/profile/${writer.id}`}>
        <ImageContainer>
          <Image src={writer.image} alt={`${writer.id}의 프로필 사진`} />
        </ImageContainer>
      </Link>
      <Descriptions>
        <Link to={`/profile/${writer.id}`}>
          <NickName>{writer.nickname}</NickName>
        </Link>
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
  border: 2px solid #b6b6b6;
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
  color: black;
`;

const Date = styled.span`
  font-size: 12px;
  color: #8f8f8f;
`;

export default CardHead;
