import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { CommentType } from "../store/comments";

const setCommentDatabase = async (postId: string, commentId: string, commentInfos: CommentType) => {
  try {
    await db.collection("comments").doc(postId).update(commentInfos);

    const postInfosRef = doc(db, "posts", postId);
    await updateDoc(postInfosRef, {
      comments: arrayUnion(commentId),
    });
  } catch (err) {
    console.error(err);
  }
};

export default setCommentDatabase;
