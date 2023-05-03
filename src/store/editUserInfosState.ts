import { atom } from "recoil";

export interface DestinationsType {
  domestic: string[];
  abroad: string[];
}

export interface EditUserInfosType {
  email: string;
  nickname: string;
  destinations: DestinationsType;
  selected: number;
  questions: string[];
  saveComments: {
    [key: string]: string[];
  };
}

const editUserInfosState = atom<EditUserInfosType>({
  key: "editUserInfosState",
  default: {
    email: "",
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

export default editUserInfosState;
