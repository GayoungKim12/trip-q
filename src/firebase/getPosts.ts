import { PostContentType } from "../store/postContent";
import { PostsType } from "../store/postsState";
import { db } from "./firebase";

export const getPosts = async (limit: number) => {
  try {
    const querySnapshot = await db.collection("posts").orderBy("timeStamp").limitToLast(limit).get();
    const datas = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return [
        doc.id,
        {
          writer: data?.writer,
          destination: data?.destination,
          question: data?.question,
          timeStamp: data?.timeStamp,
        },
      ] as [string, PostContentType];
    });
    const result: PostsType = {};
    datas.reverse().forEach((data) => {
      result[data[0]] = data[1];
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};
