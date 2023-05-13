import { useRecoilState } from "recoil";
import styled from "styled-components";
import editUserInfosState from "../../store/editUserInfosState";
import UploadImage from "./UploadImage";

const EditUserInfosInputs = () => {
  const [editUserInfos, setEditUserInfos] = useRecoilState(editUserInfosState);

  const changeInputValue = (type: "nickname" | "image", content: string) => {
    setEditUserInfos((prevUserInfos) => ({
      ...prevUserInfos,
      [type]: content,
    }));
  };

  return (
    <>
      <UploadImage />
      <Place>
        <Label htmlFor={"email"}>{"이메일"}</Label>
        <Input type={"email"} id={"email"} value={`${editUserInfos.email}`} disabled />
      </Place>
      <Place>
        <Label htmlFor={"nickname"}>{"닉네임"}</Label>
        <Input
          type={"text"}
          id={"nickname"}
          placeholder={"닉네임을 입력해주세요."}
          value={`${editUserInfos.nickname}`}
          onChange={(e) => {
            changeInputValue("nickname", e.target.value);
          }}
        />
      </Place>
    </>
  );
};

const Place = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 280px;
`;

const Label = styled.label`
  font-size: 12px;
  color: #8f8f8f;
  font-weight: 700;

  span {
    color: red;
  }
`;

const Input = styled.input`
  padding: 0 12px;
  width: 100%;
  height: 48px;
  border: 1px solid #8f8f8f;
  border-radius: 4px;

  &::placeholder {
    color: #959595;
  }
`;

export default EditUserInfosInputs;
