import { atom } from "recoil";

export interface FilterType {
  content: string;
}

const filterState = atom<FilterType>({
  key: "filterState",
  default: {
    content: "",
  },
});

export default filterState;
