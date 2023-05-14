import { db } from "./firebase";
import { arrayRemove, deleteDoc, doc, getDoc, increment } from "firebase/firestore";

const setUnsaveCommentsDatabase = async (userId: string, postId: string, commentId: string) => {
  try {
    const postRef = db.collection("users").doc(userId).collection("saveComments").doc(postId);
    const postDocRef = await getDoc(postRef);
    const data = postDocRef.data();

    if (data?.size === 1) {
      await deleteDoc(doc(db, "users", userId, "saveComments", postId));
    } else {
      await postRef.update({
        comments: arrayRemove(commentId),
        size: increment(-1),
      });
    }

    const commentDocRef = db.collection("posts").doc(postId).collection("comments").doc(commentId);

    await commentDocRef.update({
      selected: increment(-1),
    });
  } catch (err) {
    console.error(err);
  }
};

export default setUnsaveCommentsDatabase;
