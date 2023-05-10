import { useEffect, useState } from "react";
import { BsAirplaneFill } from "react-icons/bs";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import usersState, { WriterType } from "../../store/usersState";
import { getUserInfos } from "../../firebase/getUserInfos";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

interface ProfileAreaProps {
  writer: string;
  timeStamp: Timestamp | null;
}

const ProfileArea = (props: ProfileAreaProps) => {
  const { writer, timeStamp } = props;
  const navigate = useNavigate();
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
  }, [setUsers, users, writer]);

  useEffect(() => {
    if (timeStamp) {
      setDate(new Date(timeStamp.seconds * 1000));
    }
  }, [timeStamp]);
  console.log(date);

  return (
    <Container>
      <ImageContainer onClick={() => navigate(`/profile/${writer}`)}>
        {writerInfos?.image.length ? (
          <Image src={writerInfos?.image} alt={`${writerInfos?.nickname}의 프로필 이미지`} />
        ) : (
          <BsAirplaneFill />
        )}
      </ImageContainer>
      <NickName onClick={() => navigate(`/profile/${writer}`)}>{writerInfos?.nickname}</NickName>
      {date && <DateString>{date.toLocaleDateString()}</DateString>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
  border: 2px solid #b6b6b6;
  font-size: 15px;
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

const NickName = styled.span`
  font-size: 14px;
  color: #8f8f8f;
  cursor: pointer;
`;

const DateString = styled.span`
  font-size: 14px;
  color: #8f8f8f;
`;

export default ProfileArea;
