import styled from "styled-components";

interface TagProps {
  content: string;
  onDelete?: (destinaiton: string) => void;
}

const Tag = (props: TagProps) => {
  return (
    <Span>
      {props.content}
      {props.onDelete && (
        <Delete
          onClick={(e) => {
            e.preventDefault();
            if (props.onDelete) {
              props.onDelete(props.content);
            }
          }}
        >
          ✕
        </Delete>
      )}
    </Span>
  );
};

const Span = styled.span`
  position: relative;
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

const Delete = styled.button`
  position: absolute;
  top: -4px;
  right: -4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  font-size: 10px;
  font-weight: 700;
  color: white;
`;

export default Tag;
