import Tabs from "./Tabs";
import UserInfos from "./UserInfos";
import { useEffect, useState } from "react";
import { getUserInfos } from "../../firebase/getUserInfos";
import { EditUserInfosType } from "../../store/editUserInfosState";
import { useRecoilValue } from "recoil";
import signInUser from "../../store/signInUser";

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
      const { email, nickname, image, destinations, selected, questions, saveComments } = signInUserState;
      setUserInfos({
        email,
        nickname,
        image,
        destinations,
        selected,
        questions,
        saveComments,
      });
      return;
    }

    (async () => {
      const infos = await getUserInfos(userId);

      const newInfos = {
        email: infos?.email,
        nickname: infos?.nickname,
        image: infos?.image,
        destinations: infos?.destinations,
        selected: infos?.selected,
        questions: infos?.questions,
        saveComments: infos?.saveComments,
      };

      setUserInfos(newInfos);
    })();
  }, [userId, signInUserState]);

  if (!userInfos) return <>Loading...</>;

  return (
    <>
      <UserInfos userInfos={userInfos} />
      <Tabs userInfos={userInfos} userId={userId} />
    </>
  );
};

export default Profile;
