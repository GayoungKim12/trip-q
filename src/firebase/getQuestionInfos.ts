import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getQuestionInfos = async (qid: string) => {
  const docRef = doc(db, "posts", qid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const newQuestionInfos = docSnap.data();
    return newQuestionInfos;
  }
};
