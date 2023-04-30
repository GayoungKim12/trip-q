import styled from "styled-components";
import Logo from "./Logo";
import Tools from "./Tools";

const Header = () => {
  return (
    <HeaderArea>
      <Container>
        <Logo />
        <Tools />
      </Container>
    </HeaderArea>
  );
};

const HeaderArea = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 16px;
  max-width: 1024px;
  width: 100%;
  height: 100%;
`;

export default Header;
