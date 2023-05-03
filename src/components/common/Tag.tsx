import styled from "styled-components";

interface TagProps {
  content: string;
}

const Tag = (props: TagProps) => {
  return <Span>{props.content}</Span>;
};

const Span = styled.span`
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #38c8b4;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #fff;
`;

export default Tag;
