import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { PostContentType } from "../store/postContent";
import { PostsType } from "../store/postsState";
import { INITIAL_FETCH_COUNT } from "../constants/InitialFetchCount";

export const getPostsByFilter = async (filter: string, start: null | QueryDocumentSnapshot<DocumentData>) => {
  try {
    let q;
    if (!start) {
      q = query(
        collection(db, "posts"),
        where("destination", "array-contains", filter),
        orderBy("timeStamp", "desc"),
        limit(INITIAL_FETCH_COUNT)
      );
    } else {
      q = query(
        collection(db, "posts"),
        where("destination", "array-contains", filter),
        orderBy("timeStamp", "desc"),
        startAfter(start),
        limit(INITIAL_FETCH_COUNT)
      );
    }

    const querySnapshot = await getDocs(q);
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    const datas = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return [
        doc.id,
        {
          writer: data?.writer,
          destination: data?.destination,
          question: data?.question,
          comment: data?.comment,
          timeStamp: data?.timeStamp,
        },
      ] as [string, PostContentType];
    });
    const result: PostsType = {};
    datas.forEach((data) => {
      result[data[0]] = data[1];
    });
    return { result, lastDoc };
  } catch (err) {
    console.error(err);
  }
};
