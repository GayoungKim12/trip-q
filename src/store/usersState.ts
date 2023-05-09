import { atom } from "recoil";

export interface WriterType {
  nickname: string;
  image: string;
}

export interface UsersType {
  [key: string]: WriterType;
}

const usersState = atom<UsersType>({
  key: "usersState",
  default: {},
});

export default usersState;
