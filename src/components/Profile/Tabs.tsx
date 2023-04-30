import { useState } from "react";
import styled from "styled-components";
import Writings from "./Writings";
import Comments from "./Comments";
import { UserType } from "../../store/users";

interface TabsProps {
  userInfos: UserType;
}

const Tabs = (props: TabsProps) => {
  const [active, setActive] = useState("writing");
  const { questions, saveComments } = props.userInfos;

  return (
    <Container>
      <TabContainer>
        <Tab
          className={active === "writing" ? "active" : ""}
          onClick={() => {
            setActive("writing");
          }}
        >
          작성한 글
        </Tab>
        <Tab
          className={active === "storage" ? "active" : ""}
          onClick={() => {
            setActive("storage");
          }}
        >
          보관함
        </Tab>
      </TabContainer>
      {active === "writing" ? (
        <Writings questions={questions} />
      ) : (
        <Comments comments={saveComments} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #8f8f8f;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  width: 100%;
  height: 56px;
  color: #8f8f8f;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #8f8f8f;
  width: 50%;

  &.active {
    border-bottom: 2px solid black;
    font-weight: 500;
    color: black;
  }
`;

export default Tabs;
