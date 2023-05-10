import { db } from "./firebase";
import { CommentsType } from "../store/comments";

const getCommentsByPid = async (pid: string, limit = 100) => {
  try {
    const docRef = db.collection("posts").doc(pid);
    const querySnapshot = await docRef.collection("comments").orderBy("timeStamp").limitToLast(limit).get();
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
