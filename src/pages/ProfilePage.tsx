import styled from "styled-components";
import { useParams } from "react-router-dom";
import EditProfileButton from "../components/Profile/EditProfileButton";
import Profile from "../components/Profile/Profile";

const ProfilePage = () => {
  const { userId } = useParams();
  const myId = localStorage.getItem("sign-in-user");

  if (!userId) return <>없는 페이지입니다.</>;

  return (
    <Container>
      {myId === userId && (
        <>
          {/* <LogOutButton /> */}
          <EditProfileButton userId={userId} />
        </>
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

export default ProfilePage;
