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
import { PostContentType } from "../store/postContent";
import { PostsType } from "../store/postsState";
import { db } from "./firebase";
import { INITIAL_FETCH_COUNT } from "../constants/InitialFetchCount";

export const getPostsByUid = async (userId: string, start: null | QueryDocumentSnapshot<DocumentData>) => {
  let q;
  if (!start) {
    q = query(
      collection(db, "posts"),
      where("writer", "==", userId),
      orderBy("timeStamp", "desc"),
      limit(INITIAL_FETCH_COUNT)
    );
  } else {
    q = query(
      collection(db, "posts"),
      where("writer", "==", userId),
      orderBy("timeStamp", "desc"),
      startAfter(start),
      limit(INITIAL_FETCH_COUNT)
    );
  }

  const querySnapshot = await getDocs(q);
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  const docIds = querySnapshot.docs.map((doc) => {
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
  docIds.forEach((data) => {
    result[data[0]] = data[1];
  });

  return { result, lastDoc };
};
