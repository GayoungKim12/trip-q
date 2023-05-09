import { atom } from "recoil";
import { WriterType } from "./datas";

export interface DestinationsType {
  domestic: string[];
  abroad: string[];
}

export interface EditPostContentType {
  writer: WriterType;
  date: string;
  destination: string[];
  question: string;
  bestComment: string;
  comments: string[];
}

const EditPostContentState = atom<EditPostContentType>({
  key: "EditPostContentState",
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

export default EditPostContentState;
