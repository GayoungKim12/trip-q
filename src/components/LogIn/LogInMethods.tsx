import styled from "styled-components";
import GoogleLoginButton from "./GoogleLogInButton";
import TripQLogIn from "./TripQLogIn";

const LogInMethods = () => {
  return (
    <LogInArea>
      <GoogleLoginButton />
      <Division>
        <hr />
        <span>또는 TripQ ID로 로그인</span>
        <hr />
      </Division>
      <TripQLogIn />
    </LogInArea>
  );
};

const LogInArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 20px 0;

  & label {
    margin-left: 8px;
  }
`;

const Division = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 12px;
  color: #8f8f8f;

  & > hr {
    width: 100px;
  }
`;

export default LogInMethods;
