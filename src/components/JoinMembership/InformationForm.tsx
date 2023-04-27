import styled from "styled-components";
import { JoinMembershipInputs } from "../../constants/JoinMembershipInputs";

const InformationsForm = () => {
  return (
    <Form>
      {JoinMembershipInputs.map((input) => {
        return (
          <Place key={input.id}>
            <Label htmlFor={input.id}>
              {input.label}
              <span> *</span>
            </Label>
            <Input
              type={input.type}
              id={input.id}
              placeholder={input.placeholder}
            />
            {input.rule && <Rule>{input.rule}</Rule>}
          </Place>
        );
      })}
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

const Place = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  width: 280px;
  height: 48px;
  border: 1px solid #8f8f8f;
  border-radius: 4px;

  &::placeholder {
    color: #959595;
  }
`;

const Rule = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #8f8f8f;
`;

const Button = styled.button`
  margin-top: 24px;
  padding: 0 12px;
  width: 320px;
  height: 60px;
  background-color: #74d3c3;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

export default InformationsForm;
