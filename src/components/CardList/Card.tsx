import styled from "styled-components";

const data = {
  id: "q48573975",
  writer: {
    id: "123",
    nickname: "라뮤",
    image: "https://via.placeholder.com/100x100",
  },
  date: "2023-04-28",
  destination: ["해외", "일본", "후쿠오카"],
  question: "후쿠오카는 언제 가는게 제일 좋나요?",
  bestComment: "c3429806",
  comments: ["c3429803", "c3429806", "c3429906"], // 리뷰 id
};

const Card = () => {
  // if login user id와 Card data writer id가 같다면 메뉴 존재
  return (
    <Container>
      {/* <Head />
      <Body /> */}
    </Container>
  );
};

const Container = styled.div`
  width: 720px;
  padding: 12px;
  border-radius: 16px;
`;

export default Card;
