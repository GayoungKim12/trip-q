import { db } from "./firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

const getBestComment = async (pid: string) => {
  try {
    const postRef = collection(db, "posts", pid, "comments");
    const q = query(postRef, orderBy("selected", "desc"), orderBy("timeStamp", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    let result = null;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.selected !== 0) {
        result = data.content as string;
      }
    });

    return result;
  } catch (err) {
    console.error(err);
  }
};

export default getBestComment;
