import styled from "styled-components";
import { useRecoilState } from "recoil";
import userInfosState from "../../store/userInfosState";
import { useState } from "react";
import { db } from "../../firebase/firebase";

interface SignUpInputsProps {
  checkEmail: () => void;
  isDuplication: boolean | null;
  setIsDuplication: (value: boolean) => void;
}

const SignUpInputs = (props: SignUpInputsProps) => {
  const [userInfos, setUserInfos] = useRecoilState(userInfosState);
  const [isSame, setIsSame] = useState(true);

  const changeInputValue = (type: "email" | "password" | "passwordCheck" | "nickname", content: string) => {
    setUserInfos((prevUserInfos) => ({
      ...prevUserInfos,
      [type]: content,
    }));
  };

  const checkDuplication = (e: React.MouseEvent, email: string) => {
    e.preventDefault();

    props.checkEmail();

    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          props.setIsDuplication(true);
        } else {
          props.setIsDuplication(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Place>
        <Label htmlFor={"email"}>
          {"이메일"}
          <span> *</span>
        </Label>
        <Input
          type={"email"}
          id={"email"}
          placeholder={"이메일을 입력해주세요."}
          onChange={(e) => {
            changeInputValue("email", e.target.value);
          }}
          required
        />
        {props.isDuplication === true && <Warning>이미 존재하는 이메일입니다.</Warning>}
        {props.isDuplication === false && <Pass>사용가능한 이메일입니다.</Pass>}
        <CheckDuplication onClick={(e) => checkDuplication(e, userInfos.email)}>중복확인</CheckDuplication>
      </Place>
      <Place>
        <Label htmlFor={"password"}>
          {"비밀번호"}
          <span> *</span>
        </Label>
        <Input
          type={"password"}
          id={"password"}
          placeholder={"비밀번호를 입력해주세요."}
          onChange={(e) => {
            changeInputValue("password", e.target.value);
          }}
          required
        />
        <Rule>{"영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리"}</Rule>
      </Place>
      <Place>
        <Label htmlFor={"password-check"}>
          {"비밀번호 확인"}
          <span> *</span>
        </Label>
        <Input
          type={"password"}
          id={"password-check"}
          placeholder={"비밀번호를 다시 입력해주세요."}
          onChange={(e) => {
            changeInputValue("passwordCheck", e.target.value);
            if (userInfos.password === e.target.value) {
              setIsSame(true);
            } else {
              setIsSame(false);
            }
          }}
          required
        />
        {!isSame && <Warning>비밀번호와 같지 않습니다.</Warning>}
      </Place>
      <Place>
        <Label htmlFor={"nickname"}>
          {"닉네임"}
          <span> *</span>
        </Label>
        <Input
          type={"text"}
          id={"nickname"}
          placeholder={"닉네임을 입력해주세요."}
          onChange={(e) => {
            changeInputValue("nickname", e.target.value);
          }}
          required
        />
      </Place>
    </>
  );
};

const Place = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 280px;
`;

const Label = styled.label`
  font-size: 12px;
  color: #8f8f8f;
  font-weight: 700;

  span {
    color: red;
  }
`;

const Input = styled.input`
  padding: 0 12px;
  width: 100%;
  height: 48px;
  border: 1px solid #8f8f8f;
  border-radius: 4px;

  &::placeholder {
    color: #959595;
  }
`;

const CheckDuplication = styled.button`
  padding: 12px 20px;
  background-color: #38c8b4;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;

  &:hover {
    background-color: #45b8ab;
  }
`;

const Rule = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #8f8f8f;
`;

const Warning = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: red;
`;

const Pass = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #12d35a;
`;

export default SignUpInputs;
