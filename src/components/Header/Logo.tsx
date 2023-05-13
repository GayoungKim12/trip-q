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
  margin-right: 32px;
  font-size: 36px;
  color: #38c8b4;
  font-family: "Readex Pro";
`;

export default Logo;
