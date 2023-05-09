import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { PostContentType } from "../../store/postContent";
import { getQuestionInfos } from "../../firebase/getQuestionInfos";
import CommentList from "./CommentList";
import styled from "styled-components";
import signInUser from "../../store/signInUser";
import DeleteEditButton from "../common/DeleteEditButton";
import ProfileArea from "./ProfileArea";
import QuestionArea from "./QuestionArea";
import CommentForm from "./CommentForm";

interface PostAndCommentProps {
  pid: string;
}

const PostAndComment = (props: PostAndCommentProps) => {
  const pid = props.pid;
  const [postInfos, setPostInfos] = useState<PostContentType | null>(null);
  const signInUserState = useRecoilValue(signInUser);

  useEffect(() => {
    (async () => {
      const infos = await getQuestionInfos(pid);
      if (infos) {
        const newInfos = {
          writer: infos.writer,
          date: infos.date,
          destination: infos.destination,
          question: infos.question,
          bestComment: infos.bestComment,
          comments: infos.comments,
        };

        setPostInfos(newInfos);
      }
    })();
  }, [pid]);

  if (!postInfos) return null;
  const { writer, date, destination, question } = postInfos;

  return (
    <Container>
      <ProfileAndQuestion>
        <QuestionArea destination={destination} question={question} />
        <Explanation>
          <ProfileArea writer={writer} date={date} />
          {postInfos.writer === signInUserState?.uid && <DeleteEditButton pid={pid} />}
        </Explanation>
      </ProfileAndQuestion>
      <CommentForm pid={pid} />
      <CommentList pid={pid} comments={postInfos.comments} />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
`;

const ProfileAndQuestion = styled.div`
  display: flex;
  padding: 14px 16px 12px;
  width: 100%;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #8f8f8f;
  border-radius: 16px;
`;

const Explanation = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default PostAndComment;
