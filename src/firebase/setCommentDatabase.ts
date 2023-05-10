import { db } from "./firebase";
import { CommentType } from "../store/comments";
import { serverTimestamp } from "firebase/firestore";

const setCommentDatabase = async (postId: string, commentId: string, commentInfos: CommentType) => {
  try {
    await db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .set({ ...commentInfos, timeStamp: serverTimestamp() });
  } catch (err) {
    console.error(err);
  }
};

export default setCommentDatabase;
