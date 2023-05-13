import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface PostContentType {
  writer: string;
  destination: string[];
  question: string;
  comment: number;
  timeStamp: Timestamp | null;
}

const postContent = atom<PostContentType>({
  key: "postContent",
  default: {
    writer: "",
    destination: [],
    question: "",
    comment: 0,
    timeStamp: null,
  },
});

export default postContent;
