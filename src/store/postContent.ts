import { atom } from "recoil";

export interface PostContentType {
  writer: string;
  date: string;
  destination: string[];
  question: string;
  bestComment: string;
  comments: string[]; // 리뷰 id
}

const postContent = atom<PostContentType>({
  key: "postContent",
  default: {
    writer: "",
    date: "",
    destination: [],
    question: "",
    bestComment: "",
    comments: [],
  },
});

export default postContent;
