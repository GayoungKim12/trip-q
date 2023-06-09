import styled from "styled-components";
import ImageAndNickname from "./ImageAndNickname";
import Travels from "./Travels";
import { EditUserInfosType } from "../../store/editUserInfosState";

interface UserInfosProps {
  userInfos: EditUserInfosType;
}

const UserInfos = (props: UserInfosProps) => {
  const infos = props.userInfos;

  if (!infos.uid) return <></>;

  return (
    <Container>
      <Middle>
        <ImageAndNickname uid={infos.uid} image={infos.image} nickname={infos.nickname} />
        <Selected>
          <Number>{infos.questions.length.toLocaleString()}</Number>
          <Span>게시글 수</Span>
        </Selected>
      </Middle>
      <Travels destinations={infos.destinations} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
`;

const Middle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Selected = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Number = styled.span`
  font-size: 28px;
  font-weight: 500;
`;

const Span = styled.span`
  font-size: 14px;
  font-weight: 300;
  color: #8f8f8f;
`;

export default UserInfos;
