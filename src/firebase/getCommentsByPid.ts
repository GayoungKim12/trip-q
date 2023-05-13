import { db } from "./firebase";
import { CommentsType } from "../store/comments";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

const getCommentsByPid = async (pid: string, lim = 100) => {
  try {
    const postRef = collection(db, "posts", pid, "comments");
    const q = query(postRef, orderBy("selected", "desc"), orderBy("timeStamp", "desc"), limit(lim));
    const querySnapshot = await getDocs(q);
    const result: CommentsType = {};

    querySnapshot.docs.map((doc) => {
      const data = doc.data();
      result[doc.id] = {
        writer: data?.writer,
        pid: data?.pid,
        content: data?.content,
        selected: data?.selected,
        timeStamp: data?.timeStamp,
      };
    });

    return result;
  } catch (err) {
    console.error(err);
  }
};

export default getCommentsByPid;
