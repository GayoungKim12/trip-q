import { atom } from "recoil";

export interface WriterType {
  uid: string;
  nickname: string;
  image: string;
}

export interface PostContentType {
  writer: WriterType;
  date: string;
  destination: string[];
  question: string;
  bestComment: string;
  comments: string[]; // 리뷰 id
}

const postContent = atom<PostContentType>({
  key: "postContent",
  default: {
    writer: {
      uid: "",
      nickname: "",
      image: "",
    },
    date: "",
    destination: [],
    question: "",
    bestComment: "",
    comments: [],
  },
});

export default postContent;
