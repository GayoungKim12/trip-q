import styled from "styled-components";
import { useParams } from "react-router-dom";
import EditProfileButton from "../components/Profile/EditProfileButton";
import Profile from "../components/Profile/Profile";
import LogOutButton from "../components/Profile/LogoutButton";
import { useEffect, useState } from "react";
import signInUser from "../store/signInUser";
import { useRecoilValue } from "recoil";

const ProfilePage = () => {
  const { userId } = useParams();
  const signInUserState = useRecoilValue(signInUser);
  const [myUserId, setMyUserId] = useState<string | undefined>(signInUserState?.uid);

  useEffect(() => {
    setMyUserId(signInUserState?.uid);
  }, [signInUserState?.uid]);

  if (!userId) return <>없는 페이지입니다.</>;

  return (
    <Container>
      {myUserId === userId && (
        <Buttons>
          <EditProfileButton userId={userId} />
          <span>|</span>
          <LogOutButton />
        </Buttons>
      )}
      <Profile userId={userId} />
    </Container>
  );
};

const Container = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 640px;
  margin: 0 auto;
`;

const Buttons = styled.div`
  position: absolute;
  top: -16px;
  right: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 12px;
  color: #8f8f8f;

  & button {
    font-size: 12px;
    color: #8f8f8f;
  }
`;

export default ProfilePage;
