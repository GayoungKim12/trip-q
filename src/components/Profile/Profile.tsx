import Tabs from "./Tabs";
import UserInfos from "./UserInfos";
import { useEffect, useState } from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

interface ProfileProps {
  userId: string;
}

const Profile = (props: ProfileProps) => {
  const userId = props.userId;
  const [userInfos, setUserInfos] = useState<DocumentData | null>(null);

  useEffect(() => {
    if (!userId) return;

    const getUserInfos = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const newUserInfos = docSnap.data();
        setUserInfos(newUserInfos);
      }
    };

    getUserInfos();
  }, [userId]);

  if (!userInfos) return <>NOT USER</>;

  return (
    <>
      <UserInfos userInfos={userInfos} />
      <Tabs userInfos={userInfos} />
    </>
  );
};

export default Profile;
