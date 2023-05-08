import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getQuestionInfos = async (pid: string) => {
  const docRef = doc(db, "posts", pid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const newQuestionInfos = docSnap.data();
    return newQuestionInfos;
  }
};
