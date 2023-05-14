import { db } from "./firebase";
import { getDoc } from "firebase/firestore";

const checkSavedComments = async (userId: string, postId: string, commentId: string) => {
  try {
    const postRef = db.collection("users").doc(userId).collection("saveComments").doc(postId);
    const postDocSnapshot = await getDoc(postRef);

    if (postDocSnapshot.exists()) {
      const comments = postDocSnapshot.data().comments;
      if (comments.includes(commentId)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

export default checkSavedComments;
