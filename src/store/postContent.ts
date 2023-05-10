import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface PostContentType {
  writer: string;
  destination: string[];
  question: string;
  timeStamp: Timestamp | null;
}

const postContent = atom<PostContentType>({
  key: "postContent",
  default: {
    writer: "",
    destination: [],
    question: "",
    timeStamp: null,
  },
});

export default postContent;
