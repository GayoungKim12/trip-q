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
import { db } from "./firebase";
import { INITIAL_FETCH_COUNT } from "../constants/InitialFetchCount";

const getSavedComments = async (userId: string, start: null | QueryDocumentSnapshot<DocumentData>) => {
  try {
    let q;
    if (!start) {
      q = query(
        collection(db, "users", userId, "saveComments"),
        orderBy("timeStamp", "desc"),
        limit(INITIAL_FETCH_COUNT)
      );
    } else {
      q = query(
        collection(db, "users", userId, "saveComments"),
        orderBy("timeStamp", "desc"),
        startAfter(start),
        limit(INITIAL_FETCH_COUNT)
      );
    }

    const querySnapshot = await getDocs(q);
    const result: { [key: string]: string[] } = {};

    querySnapshot.docs.map((doc) => {
      const data = doc.data();
      result[doc.id] = data?.comments;
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getSavedComments;
