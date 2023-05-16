import { db } from "./firebase";

export interface UserDataType {
  email: string;
  nickname: string;
  image: string;
  destinations: {
    domestic: string[];
    abroad: string[];
  };
  questions: string[];
}

const setUserDatabase = async (userId: string, userInfos: UserDataType) => {
  try {
    await db.collection("users").doc(userId).set(userInfos);
  } catch (err) {
    console.error(err);
  }
};

export default setUserDatabase;
