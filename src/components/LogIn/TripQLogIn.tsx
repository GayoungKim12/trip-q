import styled from "styled-components";
import SetAccount from "./SetAccount";

const TripQLogIn = () => {
  return (
    <Form>
      <Place>
        <Label htmlFor={"id"}>아이디</Label>
        <Input type="text" id={"id"} placeholder={"아이디를 입력해주세요."} />
      </Place>
      <Place>
        <Label htmlFor={"password"}>비밀번호</Label>
        <Input
          type="password"
          id={"password"}
          placeholder={"비밀번호를 입력해주세요."}
        />
      </Place>
      <Button>로그인</Button>
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
`;

export default TripQLogIn;
