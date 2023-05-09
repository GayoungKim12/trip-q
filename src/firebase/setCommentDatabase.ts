import { db } from "./firebase";
import { CommentType, CommentsType } from "../store/comments";

const setCommentDatabase = async (postId: string, commentId: string, commentInfos: CommentType) => {
  try {
    await db.collection("posts").doc(postId).collection("comments").doc(commentId).set(commentInfos);
  } catch (err) {
    console.error(err);
  }
};

export default setCommentDatabase;
