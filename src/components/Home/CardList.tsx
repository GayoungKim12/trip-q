import styled from "styled-components";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import Card from "../Card/Card";
import { PostContentType } from "../../store/postContents";

const CardList = () => {
  const [datas, setDatas] = useState<[string, PostContentType][] | null>(null);

  useEffect(() => {
    (async () => {
      const querySnapshot = await db.collection("posts").orderBy("date").limitToLast(5).get();
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
  }, []);

  if (!datas) return null;

  return (
    <Container>
      {datas.map((data) => {
        return <Card key={data[0]} qid={data[0]} infos={data[1]} />;
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
