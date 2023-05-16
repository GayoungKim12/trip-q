import { atom } from "recoil";

export interface DestinationsType {
  domestic: string[];
  abroad: string[];
}

export interface SignInUserType {
  uid: string;
  email: string;
  nickname: string;
  image: string;
  destinations: DestinationsType;
  questions: string[];
}

const signInUser = atom<SignInUserType | null>({
  key: "signInUser",
  default: null,
});

export default signInUser;
