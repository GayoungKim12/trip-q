import { db } from "./firebase";
import { arrayUnion, getDoc, increment, serverTimestamp } from "firebase/firestore";

const setSaveCommentsDatabase = async (userId: string, postId: string, commentId: string) => {
  try {
    const postDocRef = db.collection("users").doc(userId).collection("saveComments").doc(postId);
    const postDocSnapshot = await getDoc(postDocRef);

    if (postDocSnapshot.exists()) {
      await postDocRef.update({
        comments: arrayUnion(commentId),
        size: increment(1),
        timeStamp: serverTimestamp(),
      });
    } else {
      await postDocRef.set({
        comments: [commentId],
        size: 1,
        timeStamp: serverTimestamp(),
      });
    }

    const commentDocRef = db.collection("posts").doc(postId).collection("comments").doc(commentId);

    await commentDocRef.update({
      selected: increment(1),
    });
  } catch (err) {
    console.error(err);
  }
};

export default setSaveCommentsDatabase;
