import { atom } from "recoil";

export interface DestinationsType {
  국내: {
    [key: string]: string[];
  };
  해외: {
    [key: string]: string[];
  };
}

const destinationsState = atom<DestinationsType | null>({
  key: "destinationsState",
  default: null,
});

export default destinationsState;
