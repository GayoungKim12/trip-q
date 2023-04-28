import styled from "styled-components";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <Link to={"/"}>
        <Title>TripQ</Title>
      </Link>
    </>
  );
};

const Title = styled.h1`
  font-size: 32px;
  color: #38c8b4;
  margin-right: 32px;
`;

export default Logo;
