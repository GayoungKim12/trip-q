import styled from "styled-components";
import InformationsForm from "./InformationForm";

const UserInformations = () => {
  return (
    <Container>
      <InformationsForm />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 20px 0;

  & label {
    margin-left: 8px;
  }
`;

export default UserInformations;
