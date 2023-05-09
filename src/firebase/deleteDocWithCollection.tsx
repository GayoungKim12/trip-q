import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const deletePostWithComments = async (pid: string) => {
  try {
    const postsRef = db.collection("posts").doc(pid);
    const commentsSnapshot = await postsRef.collection("comments").get();
    commentsSnapshot.docs.forEach((doc) => {
      doc.ref.delete();
    });

    deleteDoc(doc(db, "posts", pid));
  } catch (err) {
    console.error(err);
  }
};

export default deletePostWithComments;
