import { atom } from "recoil";

export interface CommentType {
  content: string;
  writer: string;
  date: string;
  selected: number;
  pid: string;
}

export interface CommentsType {
  [key: string]: CommentType;
}

const commentsState = atom<CommentsType>({
  key: "commentsState",
  default: {},
});

export default commentsState;
