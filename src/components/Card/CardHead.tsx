import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { WriterType } from "../../store/datas";
import { BsAirplaneFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import signInUser from "../../store/signInUser";
import { unavailableUser } from "../../util/unavailableUser";

interface CardHeadProps {
  writer: WriterType;
  date: string;
}

const CardHead = (props: CardHeadProps) => {
  const { writer, date } = props;
  const signInUserState = useRecoilValue(signInUser);
  const navigate = useNavigate();

  const clickProfile = () => {
    if (signInUserState) {
      navigate(`/profile/${writer.uid}`);
    } else {
      unavailableUser(navigate);
    }
  };

  return (
    <Container>
      <ImageContainer onClick={clickProfile}>
        {writer.image.length ? (
          <Image src={writer.image} alt={`${writer.nickname}의 프로필 이미지`} />
        ) : (
          <BsAirplaneFill />
        )}
      </ImageContainer>
      <Descriptions>
        <Link to={`/profile/${writer.uid}`}>
          <NickName>{writer.nickname}</NickName>
        </Link>
        <Date>{`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`}</Date>
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
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  border: 2px solid #b6b6b6;
  transform: rotate(45deg);
  font-size: 24px;
  color: #8f8f8f;
  overflow: hidden;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
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
