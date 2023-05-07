import { atom } from "recoil";
import { PostContentType } from "./postContent";

type PostsType = [string, PostContentType][];

const postsState = atom<PostsType>({
  key: "postsState",
  default: [],
});

export default postsState;
