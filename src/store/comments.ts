import { atom } from "recoil";

export interface CommentType {
  [key: string]: {
    content: string;
    writer: string;
    date: string;
    selected: number;
    pid: string;
  };
}

export interface CommentsType {
  [key: string]: CommentType;
}

const commentsState = atom<CommentType>({
  key: "commentsState",
  default: {},
});

export default commentsState;