import { db } from "./firebase";
import { CommentsType } from "../store/comments";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { INITIAL_FETCH_COUNT } from "../constants/InitialFetchCount";

const getCommentsByPid = async (pid: string, start: null | QueryDocumentSnapshot<DocumentData>) => {
  try {
    let q;
    if (start === null) {
      q = query(
        collection(db, "posts", pid, "comments"),
        orderBy("selected", "desc"),
        orderBy("timeStamp", "desc"),
        limit(INITIAL_FETCH_COUNT)
      );
    } else {
      q = query(
        collection(db, "posts", pid, "comments"),
        orderBy("selected", "desc"),
        orderBy("timeStamp", "desc"),
        startAfter(start),
        limit(INITIAL_FETCH_COUNT)
      );
    }

    const querySnapshot = await getDocs(q);
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    const result: CommentsType = {};

    querySnapshot.docs.map((doc) => {
      const data = doc.data();
      result[doc.id] = {
        writer: data?.writer,
        pid: data?.pid,
        content: data?.content,
        selected: data?.selected,
        timeStamp: data?.timeStamp,
      };
    });

    return { result, lastDoc };
  } catch (err) {
    console.error(err);
  }
};

export default getCommentsByPid;
