import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { CommentsType } from "../store/comments";

const getCommentsByPid = async (pid: string) => {
  try {
    const docRef = doc(db, "comments", pid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const comments = docSnap.data();
      const result: CommentsType = {};

      Object.keys(comments)
        .sort((a: string, b: string) => a.localeCompare(b))
        .reverse()
        .forEach((commentId: string) => {
          result[commentId] = {
            writer: comments[commentId].writer,
            date: comments[commentId].date,
            content: comments[commentId].content,
            pid: comments[commentId].pid,
            selected: comments[commentId].selected,
          };
        });

      return result;
    }
  } catch (err) {
    console.error(err);
  }
};

export default getCommentsByPid;
