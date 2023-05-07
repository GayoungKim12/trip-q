import styled from "styled-components";
import SelectDestination from "./SelectDestination";
import postContent from "../../store/postContent";
import { useRecoilState, useRecoilValue } from "recoil";
import PostInputs from "./PostInputs";
import Buttons from "./Buttons";
import { useNavigate } from "react-router-dom";
import signInUser from "../../store/signInUser";
import { unavailableUser } from "../../util/unavailableUser";
import { useEffect } from "react";
import { getQuestionInfos } from "../../firebase/getQuestionInfos";
import { db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

interface EditPostFormProps {
  qid: string;
}

const EditPostForm = (props: EditPostFormProps) => {
  const qid = props.qid;
  const navigate = useNavigate();
  const [postContentState, setPostContentState] = useRecoilState(postContent);
  const signInUserState = useRecoilValue(signInUser);

  useEffect(() => {
    if (!signInUserState) return;
    (async () => {
      const data = await getQuestionInfos(qid);
      setPostContentState({
        writer: data?.writer,
        date: data?.date,
        destination: data?.destination,
        question: data?.question,
        bestComment: data?.bestComment,
        comments: data?.comments,
      });
    })();
  }, [qid, signInUserState, setPostContentState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signInUserState) {
      return unavailableUser(navigate);
    }

    const postContentRef = doc(db, "posts", qid);
    await setDoc(postContentRef, postContentState);

    navigate(`/`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SelectDestination />
      <PostInputs type={"edit"} />
      <Buttons />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
  padding: 16px;
  width: 100%;
  max-width: 640px;
  border-radius: 16px;
  border: 1px solid #b6b6b6;
`;

export default EditPostForm;
