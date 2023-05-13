import styled from "styled-components";
import { storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { BsAirplaneFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import signInUser from "../../store/signInUser";
import { unavailableUser } from "../../util/unavailableUser";
import { useNavigate } from "react-router-dom";
import editUserInfosState from "../../store/editUserInfosState";
import { getImageUrl } from "../../util/getImageUrl";

const UploadImage = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [editUserInfos, setEditUserInfos] = useRecoilState(editUserInfosState);
  const signInUserState = useRecoilValue(signInUser);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (signInUserState?.image.length) {
      getImageUrl(signInUserState.uid, signInUserState.image, setImageUrl);
    }
  }, [signInUserState]);

  const upload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (imageUpload === null) return;
    if (!signInUserState) return unavailableUser(navigate);

    const imageRef = ref(storage, `images/${signInUserState.uid}/profile/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        setEditUserInfos({ ...editUserInfos, image: imageUpload.name });
      });
    });
  };

  const backToBasic = (e: React.MouseEvent) => {
    e.preventDefault();

    setImageUrl("");
    setEditUserInfos({ ...editUserInfos, image: "" });
  };

  if (!signInUserState) return <></>;

  return (
    <Place>
      <Label htmlFor={"imageFile"}>{"프로필 이미지"}</Label>
      <Upload>
        <ImageContainer>
          {imageUrl.length ? <Image src={imageUrl} alt={`${signInUserState.uid}의 프로필`} /> : <BsAirplaneFill />}
        </ImageContainer>
        <Buttons>
          <Button onClick={upload}>프로필 변경하기</Button>
          <Button onClick={backToBasic}>기본으로 돌아가기</Button>
        </Buttons>
      </Upload>
      <Input
        type={"file"}
        id={"imageFile"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            setImageUpload(e.target.files[0]);
          }
        }}
      />
    </Place>
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
  padding: 12px;
  border: 1px solid #8f8f8f;
  font-family: "Noto Sans KR";
  border-radius: 4px;
  color: #8f8f8f;

  &::placeholder {
    color: #959595;
  }
`;

const Upload = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 4px 12px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  border: 2px solid #b6b6b6;
  font-size: 40px;
  color: #8f8f8f;
  overflow: hidden;

  & > svg {
    transform: rotate(45deg);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 8px;
`;

const Button = styled.button`
  padding: 6px 12px;
  background-color: #38c8b4;
  border-radius: 8px;
  font-weight: 400;
  color: #ffffff;

  &:hover {
    background-color: #45b8ab;
  }
`;

export default UploadImage;
