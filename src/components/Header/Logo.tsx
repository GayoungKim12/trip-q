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
  color: #74d3c3;
`;

export default Logo;
