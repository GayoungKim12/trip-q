import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import postContent from "../../store/postContents";

const PostInputs = () => {
  const [postContentState, setPostContentState] = useRecoilState(postContent);
  const [inputState, setInputState] = useState("");
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputState(e.target.value);
    setPostContentState({
      ...postContentState,
      question: e.target.value,
    });
  };

  return (
    <Container>
      <Label>질문</Label>
      <Textarea placeholder={"질문을 입력해 주세요."} onChange={handleChange} value={inputState}></Textarea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #8f8f8f;
  font-weight: 500;
  font-size: 18px;
`;

const Textarea = styled.textarea`
  margin-top: 8px;
  height: 320px;
  padding: 16px;
  font-size: 16px;
  border-radius: 16px;
  border: 1px solid #b6b6b6;
  resize: none;

  &::placeholder {
    color: #959595;
  }

  &:focus {
    outline: none;
  }
`;

export default PostInputs;
