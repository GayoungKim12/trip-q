import styled from "styled-components";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { PostsType } from "../../store/postsState";

import { getPostsByUid } from "../../firebase/getPostsByUid";
import { useRecoilValue } from "recoil";
import signInUser from "../../store/signInUser";

interface WritingsProps {
  userId: string;
  questions: string[];
}

const Writings = (props: WritingsProps) => {
  const [datas, setDatas] = useState<PostsType | null>(null);
  const signInUserState = useRecoilValue(signInUser);

  useEffect(() => {
    (async () => {
      const result = await getPostsByUid(props.userId);
      setDatas(result);
    })();
  }, [props.userId, signInUserState]);

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
      {Object.keys(datas).map((qid) => {
        return <Card key={qid} pid={qid} infos={datas[qid]} />;
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
