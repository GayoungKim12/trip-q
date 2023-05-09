import { atom } from "recoil";

export interface PostContentType {
  writer: string;
  date: string;
  destination: string[];
  question: string;
}

const postContent = atom<PostContentType>({
  key: "postContent",
  default: {
    writer: "",
    date: "",
    destination: [],
    question: "",
  },
});

export default postContent;
