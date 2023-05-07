import { PostContentType } from "../store/postContent";
import { db } from "./firebase";

export const getPosts = async (limit: number) => {
  try {
    const querySnapshot = await db.collection("posts").orderBy("date").limitToLast(limit).get();
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
    return docIds.reverse();
  } catch (err) {
    console.error(err);
  }
};
