import styled from "styled-components";
import SelectDestination from "./SelectDestination";
import postContent from "../../store/postContent";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import PostInputs from "./PostInputs";
import Buttons from "./Buttons";
import { useNavigate } from "react-router-dom";
import setPostDatabase from "../../firebase/setPostDatabase";
import signInUser from "../../store/signInUser";
import { unavailableUser } from "../../util/unavailableUser";
import postsState from "../../store/postsState";
import { setId } from "../../util/setId";

const PostForm = () => {
  const [postContentState, setPostContentState] = useRecoilState(postContent);
  const [userInfos, setUserInfos] = useRecoilState(signInUser);
  const [posts, setPosts] = useRecoilState(postsState);
  const navigate = useNavigate();

  useEffect(() => {
    setPostContentState({
      writer: "",
      destination: [],
      question: "",
      comment: 0,
      timeStamp: null,
    });
  }, [setPostContentState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!userInfos) {
        return unavailableUser(navigate);
      }

      if (postContentState.destination.length === 0) {
        return alert("여행지를 선택해주세요");
      } else if (postContentState.question.length === 0) {
        return alert("글을 작성해 주세요");
      }

      const { questions, uid } = userInfos;
      const id = setId("q", uid);

      const newPostContent = { ...postContentState, writer: uid, timeStamp: null };

      await setPostDatabase(id, newPostContent, uid);
      setUserInfos({ ...userInfos, questions: [id, ...questions] });
      setPosts({ ...posts, [id]: newPostContent });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SelectDestination />
      <PostInputs type={"new"} />
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

export default PostForm;
