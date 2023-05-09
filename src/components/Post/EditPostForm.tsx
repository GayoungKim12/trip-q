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
import postsState from "../../store/postsState";

interface EditPostFormProps {
  pid: string;
}

const EditPostForm = (props: EditPostFormProps) => {
  const pid = props.pid;
  const navigate = useNavigate();
  const [postContentState, setPostContentState] = useRecoilState(postContent);
  const [posts, setPosts] = useRecoilState(postsState);
  const signInUserState = useRecoilValue(signInUser);

  useEffect(() => {
    if (!signInUserState) return;
    (async () => {
      const data = await getQuestionInfos(pid);
      setPostContentState({
        writer: data?.writer,
        date: data?.date,
        destination: data?.destination,
        question: data?.question,
      });
    })();
  }, [pid, signInUserState, setPostContentState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signInUserState) {
      return unavailableUser(navigate);
    }

    const postContentRef = doc(db, "posts", pid);
    await setDoc(postContentRef, postContentState);

    if (posts[pid]) {
      setPosts({ ...posts, pid: postContentState });
    }

    navigate(`/post/${pid}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SelectDestination />
      <PostInputs type={"edit"} />
      <Buttons pid={pid} />
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
