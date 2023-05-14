import { atom } from "recoil";

export interface DestinationsType {
  domestic: string[];
  abroad: string[];
}

export interface UserInfosType {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  image: string;
  destinations: DestinationsType;
  selected: number;
  questions: string[];
}

const userInfosState = atom<UserInfosType>({
  key: "userInfosState",
  default: {
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    image: "",
    destinations: {
      domestic: [],
      abroad: [],
    },
    selected: 0,
    questions: [],
  },
});

export default userInfosState;
