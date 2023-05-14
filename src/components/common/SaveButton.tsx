import { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import signInUser from "../../store/signInUser";
import { unavailableUser } from "../../util/unavailableUser";
import { useNavigate } from "react-router-dom";
import setSaveCommentsDatabase from "../../firebase/setSaveCommentsDatabase";
import setUnsaveCommentsDatabase from "../../firebase/setUnsaveCommentsDatabase";
import checkSavedComments from "../../firebase/checkSavedComment";

interface SaveButtonProps {
  pid: string;
  cid: string;
}

const SaveButton = (props: SaveButtonProps) => {
  const { pid, cid } = props;
  const [save, setSave] = useState(false);
  const signInUserState = useRecoilValue(signInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!signInUserState) return unavailableUser(navigate);
    (async () => {
      const result = await checkSavedComments(signInUserState.uid, pid, cid);
      if (typeof result === "boolean") {
        setSave(result);
      }
    })();
  }, [signInUserState, pid, cid, navigate]);

  const saveAnswer = async () => {
    if (!signInUserState) return unavailableUser(navigate);
    setSave(true);

    await setSaveCommentsDatabase(signInUserState.uid, pid, cid);
  };

  const unSaveAnswer = async () => {
    if (!signInUserState) return unavailableUser(navigate);
    setSave(false);

    await setUnsaveCommentsDatabase(signInUserState.uid, pid, cid);
  };

  return (
    <Container>
      {save ? (
        <BsStarFill className={"fill"} onClick={unSaveAnswer} />
      ) : (
        <BsStar className={"unfill"} onClick={saveAnswer} />
      )}
    </Container>
  );
};

const Container = styled.span`
  display: flex;
  margin-right: 8px;
  font-size: 32px;
  & .fill {
    color: #ffbf00;
  }

  & .unfill {
    color: #b6b6b6;
  }
`;

export default SaveButton;
