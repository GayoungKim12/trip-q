import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { PostContentType } from "../store/postContent";
import { db } from "./firebase";

const setPostDatabase = async (postId: string, postContent: PostContentType, userId: string) => {
  try {
    await db.collection("posts").doc(postId).set(postContent);

    const userInfosRef = doc(db, "users", userId);
    await updateDoc(userInfosRef, {
      questions: arrayUnion(postId),
    });
  } catch (err) {
    console.error(err);
  }
};

export default setPostDatabase;
