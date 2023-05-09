import { atom } from "recoil";
import { PostContentType } from "./postContent";

export interface PostsType {
  [key: string]: PostContentType;
}

const postsState = atom<PostsType>({
  key: "postsState",
  default: {},
});

export default postsState;
