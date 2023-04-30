import users from "../../store/users";
import Comments from "./Comments";
import Tabs from "./Tabs";
import UserInfos from "./UserInfos";
import Writings from "./Writings";

interface ProfileProps {
  userId: string;
}

const Profile = (props: ProfileProps) => {
  const infos = users[props.userId];

  if (!infos) return <>NOT USER</>;

  return (
    <>
      <UserInfos userInfos={infos} />
      <Tabs userInfos={infos} />
    </>
  );
};

export default Profile;
