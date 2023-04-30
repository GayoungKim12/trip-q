import styled from "styled-components";
import { useParams } from "react-router-dom";
import EditProfileButton from "../components/Profile/EditProfileButton";
import Profile from "../components/Profile/Profile";

const ProfilePage = () => {
  const { userId } = useParams();

  if (!userId) return <>Not UserId</>;

  return (
    <Container>
      <EditProfileButton />
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
