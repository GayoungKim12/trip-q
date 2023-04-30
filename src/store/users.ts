export interface UserType {
  id: string;
  email: string;
  nickname: string;
  image: string;
  selected: number;
  travels: {
    domestic: string[];
    abroad: string[];
  };
  questions: string[];
  saveComments: {
    [key: string]: string[];
  };
}

export interface UsersType {
  [key: string]: UserType;
}

const users: UsersType = {
  gildong: {
    id: "gildong",
    email: "gildong@gmail.com",
    nickname: "홍길동",
    image: "https://via.placeholder.com/100x100",
    selected: 345,
    travels: {
      domestic: ["부산", "제주도"],
      abroad: ["일본"],
    },
    questions: [],
    saveComments: {
      q48573976: ["c093248", "c093245"],
      q48573975: ["c093248", "c093243"],
    },
  },
  kitty: {
    id: "kitty",
    email: "kitty@gmail.com",
    nickname: "Kitty",
    image: "https://via.placeholder.com/100x100",
    selected: 1234,
    travels: {
      domestic: ["부산", "제주도"],
      abroad: ["일본"],
    },
    questions: ["q48573976", "q48573976", "q48573976"],
    saveComments: {
      q48573976: ["c093248", "c093245"],
      q48573975: ["c093248", "c093243"],
    },
  },
};

export default users;
