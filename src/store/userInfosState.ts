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
  destinations: DestinationsType;
  selected: number;
  questions: string[];
  saveComments: {
    [key: string]: string[];
  };
}

const userInfosState = atom<UserInfosType>({
  key: "userInfosState",
  default: {
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    destinations: {
      domestic: [],
      abroad: [],
    },
    selected: 0,
    questions: [],
    saveComments: {},
  },
});

export default userInfosState;