import { db } from "./firebase";

export interface UserDataType {
  email: string;
  nickname: string;
  image: string;
  destinations: {
    domestic: string[];
    abroad: string[];
  };
  selected: number;
  questions: string[];
  saveComments: {
    [key: string]: string[];
  };
}

const setUserDatabase = async (userId: string, userInfos: UserDataType) => {
  try {
    await db.collection("users").doc(userId).set(userInfos);
  } catch (err) {
    console.error(err);
  }
};

export default setUserDatabase;
