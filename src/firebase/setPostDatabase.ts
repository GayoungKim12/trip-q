import { doc, setDoc } from "firebase/firestore";
import { PostContentType } from "../store/postContents";
import { db } from "./firebase";
import { EditUserInfosType } from "../store/editUserInfosState";

const setPostDatabase = async (
  postId: string,
  postContent: PostContentType,
  userId: string,
  userInfos: EditUserInfosType
) => {
  try {
    await db.collection("posts").doc(postId).set(postContent);

    const userInfosRef = doc(db, "users", userId);
    await setDoc(userInfosRef, userInfos);
  } catch (err) {
    console.error(err);
  }
};

export default setPostDatabase;
