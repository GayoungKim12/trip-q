import Tabs from "./Tabs";
import UserInfos from "./UserInfos";
import { useEffect, useState } from "react";
import { getUserInfos } from "../../firebase/getUserInfos";
import { EditUserInfosType } from "../../store/editUserInfosState";
import { useRecoilValue } from "recoil";
import signInUser from "../../store/signInUser";
import styled from "styled-components";

interface ProfileProps {
  userId: string;
}

const Profile = (props: ProfileProps) => {
  const userId = props.userId;
  const [userInfos, setUserInfos] = useState<EditUserInfosType | null>(null);
  const signInUserState = useRecoilValue(signInUser);

  useEffect(() => {
    if (!userId) return;
    if (signInUserState?.uid === userId) {
      const { email, nickname, image, destinations, questions } = signInUserState;
      setUserInfos({
        uid: userId,
        email,
        nickname,
        image,
        destinations,
        questions,
      });
      return;
    }

    (async () => {
      const infos = await getUserInfos(userId);

      const newInfos = {
        uid: userId,
        email: infos?.email,
        nickname: infos?.nickname,
        image: infos?.image,
        destinations: infos?.destinations,
        questions: infos?.questions,
      };

      setUserInfos(newInfos);
    })();
  }, [userId, signInUserState]);

  if (!userInfos) {
    return (
      <>
        <Image src="/loader.gif" />
      </>
    );
  }

  return (
    <>
      <UserInfos userInfos={userInfos} />
      <Tabs userInfos={userInfos} userId={userId} />
    </>
  );
};

const Image = styled.img`
  width: 120px;
  object-fit: cover;
`;

export default Profile;
