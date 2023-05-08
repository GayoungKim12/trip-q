import styled from "styled-components";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { PostContentType } from "../../store/postContent";

interface WritingsProps {
  userId: string;
  questions: string[];
}

const Writings = (props: WritingsProps) => {
  const [datas, setDatas] = useState<[string, PostContentType][] | null>(null);

  useEffect(() => {
    (async () => {
      const querySnapshot = await db.collection("posts").where("writer.uid", "==", props.userId).get();
      const docIds = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return [
          doc.id,
          {
            writer: data?.writer,
            date: data?.date,
            destination: data?.destination,
            question: data?.question,
            bestComment: data?.bestComment,
            comments: data?.comments,
          },
        ] as [string, PostContentType];
      });
      setDatas(docIds.reverse());
    })();
  }, [props.userId]);

  if (!datas) return null;

  if (props.questions.length === 0) {
    return (
      <Container>
        <Empty>작성하신 글이 없습니다.</Empty>
      </Container>
    );
  }

  return (
    <Container>
      {datas.map((data) => {
        return <Card key={data[0]} pid={data[0]} infos={data[1]} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
`;

const Empty = styled.p`
  padding: 12px;
  text-align: center;
`;

export default Writings;
