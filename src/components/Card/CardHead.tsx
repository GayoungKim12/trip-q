import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BsAirplaneFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import signInUser from "../../store/signInUser";
import { unavailableUser } from "../../util/unavailableUser";
import usersState, { WriterType } from "../../store/usersState";
import { useEffect, useState } from "react";
import { getUserInfos } from "../../firebase/getUserInfos";
import { Timestamp } from "firebase/firestore";

interface CardHeadProps {
  writer: string;
  timeStamp: Timestamp | null;
}

const CardHead = (props: CardHeadProps) => {
  const { writer, timeStamp } = props;
  const navigate = useNavigate();
  const signInUserState = useRecoilValue(signInUser);
  const [users, setUsers] = useRecoilState(usersState);
  const [writerInfos, setWriterInfos] = useState<WriterType | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (users[writer]) {
      setWriterInfos(users[writer]);
    } else {
      (async () => {
        const infos = await getUserInfos(writer);
        if (infos) {
          const newInfos = {
            nickname: infos.nickname,
            image: infos.image,
          };
          setWriterInfos(newInfos);
          setUsers({
            ...users,
            [writer]: newInfos,
          });
        }
      })();
    }
  }, [setUsers, users, writer, signInUserState]);

  useEffect(() => {
    if (timeStamp) {
      setDate(new Date(timeStamp.seconds * 1000));
    }
  }, [timeStamp]);

  const clickProfile = () => {
    if (signInUserState) {
      navigate(`/profile/${writer}`);
    } else {
      unavailableUser(navigate);
    }
  };

  return (
    <Container>
      <ImageContainer onClick={clickProfile}>
        {writerInfos?.image.length ? (
          <Image src={writerInfos?.image} alt={`${writerInfos?.nickname}의 프로필 이미지`} />
        ) : (
          <BsAirplaneFill />
        )}
      </ImageContainer>
      <Descriptions>
        <Link to={`/profile/${writer}`}>
          <NickName>{writerInfos?.nickname}</NickName>
        </Link>
        {date && <DateString>{date.toLocaleDateString()}</DateString>}
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
  font-size: 24px;
  color: #8f8f8f;
  overflow: hidden;
  cursor: pointer;

  & > svg {
    transform: rotate(45deg);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Descriptions = styled.div`
  display: flex;
  flex-direction: column;
`;

const NickName = styled.span`
  font-weight: 500;
  color: black;
`;

const DateString = styled.span`
  font-size: 12px;
  color: #8f8f8f;
`;

export default CardHead;
