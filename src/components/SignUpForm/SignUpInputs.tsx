import styled from "styled-components";
import { useRecoilState } from "recoil";
import userInfosState from "../../store/userInfosState";
import { useState } from "react";
import { db } from "../../firebase/firebase";

interface SignUpInputsProps {
  checkEmail: () => void;
  isDuplication: boolean | null;
  setIsDuplication: (value: boolean) => void;
  checkPassword: (bool: boolean) => void;
}

const SignUpInputs = (props: SignUpInputsProps) => {
  const [userInfos, setUserInfos] = useRecoilState(userInfosState);
  const [isSame, setIsSame] = useState(true);
  const passwordRule = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
  const [changePassword, setChangePassword] = useState(false);
  const [emailRule, setEmailRule] = useState(true);

  const changeInputValue = (type: "email" | "password" | "passwordCheck" | "nickname", content: string) => {
    setUserInfos({
      ...userInfos,
      [type]: content,
    });
  };

  const checkDuplication = async (e: React.MouseEvent, email: string) => {
    e.preventDefault();

    props.checkEmail();

    if (email.includes("@")) {
      setEmailRule(true);
    } else {
      return setEmailRule(false);
    }

    try {
      const querySnapshot = await db.collection("users").where("email", "==", email).get();
      if (querySnapshot.size > 0) {
        props.setIsDuplication(true);
      } else {
        props.setIsDuplication(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkPasswordRule = (value: string) => {
    if (passwordRule.test(value)) {
      props.checkPassword(true);
      setChangePassword(false);
    } else {
      props.checkPassword(false);
      setChangePassword(true);
    }
  };

  const checkPasswords = (type: "password" | "passwordCheck", value: string) => {
    if (
      (type === "password" && userInfos.passwordCheck === value) ||
      (type === "passwordCheck" && userInfos.password === value)
    ) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
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
        {!emailRule && <Warning>이메일 형식에 맞게 작성해주세요.</Warning>}
        {emailRule && props.isDuplication === true && <Warning>이미 존재하는 이메일입니다.</Warning>}
        {emailRule && props.isDuplication === false && <Pass>사용가능한 이메일입니다.</Pass>}
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
            const value = e.target.value;
            changeInputValue("password", value);
            checkPasswordRule(value);
            checkPasswords("password", value);
          }}
          required
        />
        {changePassword && <Warning>{"영문, 숫자 조합 8자 이상"}</Warning>}
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
            checkPasswords("passwordCheck", e.target.value);
          }}
          required
        />
        {!isSame && <Warning>비밀번호와 일치하지 않습니다.</Warning>}
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
