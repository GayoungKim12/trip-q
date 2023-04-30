export interface WriterType {
  id: string;
  nickname: string;
  image: string;
}

export interface DataType {
  id: string;
  writer: WriterType;
  date: string;
  destination: string[];
  question: string;
  bestComment?: string;
  comments: string[]; // 리뷰 id
}

export interface DatasType {
  [key: string]: DataType;
}

const datas: DatasType = {
  q48573975: {
    id: "q48573975",
    writer: {
      id: "gildong",
      nickname: "홍길동",
      image: "https://via.placeholder.com/100x100",
    },
    date: "2023-04-28",
    destination: ["해외", "일본", "후쿠오카"],
    question: "후쿠오카는 언제 가는게 제일 좋나요?",
    bestComment: "c3429806",
    comments: ["c3429803", "c3429806", "c3429906"], // 리뷰 id
  },
  q48573976: {
    id: "q48573976",
    writer: {
      id: "kitty",
      nickname: "Kitty",
      image: "https://via.placeholder.com/100x100",
    },
    date: "2023-04-20",
    destination: ["국내", "제주도"],
    question: "제주도에서 먹을 음식 추천해주세요",
    comments: ["c093248", "c093248", "c093248"], // 리뷰 id
  },
  q48573979: {
    id: "q48573979",
    writer: {
      id: "green",
      nickname: "Green01",
      image: "https://via.placeholder.com/100x100",
    },
    date: "2023-02-19",
    destination: ["국내", "제주도"],
    question: "여행 가는데 렌트가 낫나요? 아니면 대중교통 이용해도 괜찮나요?",
    bestComment: "질문에 대한 답변 블라블라블라…",
    comments: ["c093248", "c093248", "c093248"], // 리뷰 id
  },
};

export default datas;
