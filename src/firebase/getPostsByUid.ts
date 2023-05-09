import { PostContentType } from "../store/postContent";
import { PostsType } from "../store/postsState";
import { db } from "./firebase";

export const getPostsByUid = async (userId: string) => {
  const querySnapshot = await db.collection("posts").where("writer", "==", userId).get();
  const docIds = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return [
      doc.id,
      {
        writer: data?.writer,
        date: data?.date,
        destination: data?.destination,
        question: data?.question,
        bestComment: data?.bestComment,
        comments: data?.comments,
      },
    ] as [string, PostContentType];
  });
  const result: PostsType = {};
  docIds.reverse().forEach((data) => {
    result[data[0]] = data[1];
  });

  return result;
};
