import styled from "styled-components";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import SignUpInputs from "./SignUpInputs";
import setUserDatabase from "../../firebase/setUserDatabase";
import TravelPlaces from "./TravelPlaces";
import { useRecoilState, useSetRecoilState } from "recoil";
import userInfosState from "../../store/userInfosState";
import { useNavigate } from "react-router-dom";
import signInUser from "../../store/signInUser";

const SignUpForm = () => {
  const [userInfos, setUserInfos] = useRecoilState(userInfosState);
  const navigate = useNavigate();
  const setSignInUserState = useSetRecoilState(signInUser);
  const [checkEmail, setCheckEmail] = useState(false);
  const [isDuplication, setIsDuplication] = useState<boolean | null>(null);
  const [checkPassword, setCheckPassword] = useState(false);

  useEffect(() => {
    setUserInfos({
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      image: "",
      destinations: {
        domestic: [],
        abroad: [],
      },
      questions: [],
    });
  }, [setUserInfos]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!checkEmail) {
        return alert("이메일 중복 확인해주세요.");
      }
      if (isDuplication) {
        return alert("이미 존재하는 이메일입니다.");
      }
      if (!checkPassword) {
        return alert("비밀번호를 조건에 맞게 작성해주세요.");
      }
      if (userInfos.password !== userInfos.passwordCheck) {
        return alert("비밀번호를 확인해주세요.");
      }

      const userCredential = await auth.createUserWithEmailAndPassword(userInfos.email, userInfos.password);
      const user = userCredential.user;
      if (!user) throw new Error("회원가입 오류");

      const userData = {
        email: userInfos.email,
        nickname: userInfos.nickname,
        image: userInfos.image,
        destinations: userInfos.destinations,
        questions: userInfos.questions,
      };

      setSignInUserState({ uid: user.uid, ...userData });
      await setUserDatabase(user.uid, userData);
      navigate("success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SignUpInputs
        checkEmail={() => setCheckEmail(true)}
        isDuplication={isDuplication}
        setIsDuplication={(value) => setIsDuplication(value)}
        checkPassword={(bool) => setCheckPassword(bool)}
      />
      <TravelPlaces />
      <Button>가입하기</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Button = styled.button`
  margin-top: 24px;
  padding: 0 12px;
  width: 320px;
  height: 60px;
  background-color: #38c8b4;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;

  &:hover {
    background-color: #45b8ab;
  }
`;

export default SignUpForm;
