import { atom } from "recoil";

export interface DestinationsType {
  domestic: string[];
  abroad: string[];
}

export interface EditUserInfosType {
  uid?: string;
  email: string;
  nickname: string;
  image: string;
  destinations: DestinationsType;
  selected: number;
  questions: string[];
}

const editUserInfosState = atom<EditUserInfosType>({
  key: "editUserInfosState",
  default: {
    email: "",
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

export default editUserInfosState;
