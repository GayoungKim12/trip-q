import styled from "styled-components";
import Card from "./Card";

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

const datas = [
  {
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
  {
    id: "q48573976",
    writer: {
      id: "kitty",
      nickname: "Kitty",
      image: "https://via.placeholder.com/100x100",
    },
    date: "2023-04-20",
    destination: ["국내", "제주도"],
    question: "제주도에서 먹을 음식 추천해주세요",
    comments: [], // 리뷰 id
  },
];

const CardList = () => {
  return (
    <Container>
      {datas.map((data) => {
        return <Card key={data.id} infos={data} />;
      })}
    </Container>
  );
};

const Container = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
`;

export default CardList;
