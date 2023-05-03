import styled from "styled-components";
import SetAccount from "./SetAccount";
import { auth } from "../../firebase/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TripQLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInWithEmailAndPassword = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result?.user?.uid, "로그인 성공");

        localStorage.setItem("sign-in-user", `${result?.user?.uid}`);

        navigate("/");
      })
      .catch(() => {
        alert("이메일 또는 비밀번호가 틀렸습니다. 입력 정보를 다시 한 번 확인해주세요.");
      });
  };

  const handleLogIn = (e: React.MouseEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword();
  };

  const keyDownEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      signInWithEmailAndPassword();
    }
  };

  return (
    <Form>
      <Place>
        <Label htmlFor={"email"}>이메일</Label>
        <Input
          type="email"
          id={"email"}
          placeholder={"이메일을 입력해주세요."}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={keyDownEnter}
          required
        />
      </Place>
      <Place>
        <Label htmlFor={"password"}>비밀번호</Label>
        <Input
          type="password"
          id={"password"}
          placeholder={"비밀번호를 입력해주세요."}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </Place>
      <Button onClick={handleLogIn}>로그인</Button>
      <SetAccount />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Place = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 12px;
  color: #8f8f8f;
`;

const Input = styled.input`
  padding: 0 12px;
  width: 280px;
  height: 48px;
  border: 1px solid #8f8f8f;
  border-radius: 4px;

  &::placeholder {
    color: #959595;
  }
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

export default TripQLogIn;
