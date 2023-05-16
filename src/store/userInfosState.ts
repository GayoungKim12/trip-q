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
    questions: [],
  },
});

export default userInfosState;
