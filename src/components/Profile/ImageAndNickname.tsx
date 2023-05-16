import { useEffect, useState } from "react";
import { BsAirplaneFill } from "react-icons/bs";
import styled from "styled-components";
import { getImageUrl } from "../../util/getImageUrl";

interface ImageAndNicknameProps {
  uid: string;
  image: string;
  nickname: string;
}

const ImageAndNickname = (props: ImageAndNicknameProps) => {
  const { uid, image, nickname } = props;
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (image.length) {
      getImageUrl(uid, image, setImageUrl);
    } else {
      setImageUrl("");
    }

    return () => {
      setImageUrl("");
    };
  }, [image, uid]);

  return (
    <Container>
      <ImageContainer>
        {imageUrl?.length ? <Image src={imageUrl} alt={`${nickname}의 프로필 이미지`} /> : <BsAirplaneFill />}
      </ImageContainer>
      <NickName>{nickname}</NickName>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  border: 2px solid #b6b6b6;
  font-size: 24px;
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

const NickName = styled.span`
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
`;

export default ImageAndNickname;
