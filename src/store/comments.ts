import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface CommentType {
  content: string;
  writer: string;
  selected: number;
  pid: string;
  timeStamp: Timestamp | Date;
}

export interface CommentsType {
  [key: string]: CommentType;
}

const commentsState = atom<CommentsType>({
  key: "commentsState",
  default: {},
});

export default commentsState;
