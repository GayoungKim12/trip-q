import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface ButtonsProps {
  pid?: string;
}

const Buttons = (props: ButtonsProps) => {
  const navigate = useNavigate();
  const handleCacelButton = (e: React.MouseEvent) => {
    e.preventDefault();

    if (props.pid) {
      navigate(`/post/${props.pid}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <Container>
      <CancelButton onClick={handleCacelButton}>취소하기</CancelButton>
      <AddButton>등록하기</AddButton>
    </Container>
  );
};

const Container = styled.div`
  text-align: right;
  button {
    padding: 8px 12px;
    width: 120px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const CancelButton = styled.button`
  border: 2px solid #8f8f8f;
  color: #8f8f8f;

  &:hover {
    background-color: #8f8f8f;
    color: #ffffff;
  }
`;

const AddButton = styled.button`
  margin-left: 8px;
  border: 2px solid #38c8b4;
  background-color: #38c8b4;
  color: #ffffff;

  &:hover {
    background-color: #45b8ab;
  }
`;

export default Buttons;
