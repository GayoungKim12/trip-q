import styled from "styled-components";
import ImageAndNickname from "./ImageAndNickname";
import Travels from "./Travels";
import { DocumentData } from "firebase/firestore";

interface UserInfosProps {
  userInfos: DocumentData;
}

const UserInfos = (props: UserInfosProps) => {
  const infos = props.userInfos;

  if (!infos) return <>NOT USER</>;

  return (
    <Container>
      <Middle>
        <ImageAndNickname
          userId={infos.email}
          image={"https://via.placeholder.com/100x100"}
          nickname={infos.nickname}
        />
        <Selected>
          <Number>{infos.selected.toLocaleString()}</Number>
          <Span>답변 채택 수</Span>
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
