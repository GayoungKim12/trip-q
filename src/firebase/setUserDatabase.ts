import { db } from "./firebase";

export interface UserDataType {
  email: string;
  nickname: string;
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

const setUserDatabase = (userId: string, userInfos: UserDataType) => {
  db.collection("users")
    .doc(userId)
    .set(userInfos)
    .catch((error) => {
      console.error(error);
    });
};

export default setUserDatabase;
