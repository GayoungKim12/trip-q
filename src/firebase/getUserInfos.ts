import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getUserInfos = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const newUserInfos = docSnap.data();
    return newUserInfos;
  }
};
