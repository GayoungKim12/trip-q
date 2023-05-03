import styled from "styled-components";

interface PlusTagProps {
  onClick: () => void;
}

const PlusTag = (props: PlusTagProps) => {
  return <Span onClick={props.onClick}>{"+"}</Span>;
};

const Span = styled.span`
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #b6b6b6;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #fff;
  cursor: pointer;
`;

export default PlusTag;
