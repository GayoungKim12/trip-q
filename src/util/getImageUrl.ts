import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebase";

export const getImageUrl = (uid: string, image: string, callback: (url: string) => void) => {
  const imageRef = ref(storage, `images/${uid}/profile/${image}`);

  getDownloadURL(imageRef)
    .then((url) => {
      callback(url);
    })
    .catch((error) => {
      switch (error.code) {
        case "storage/object-not-found":
          console.error("File doesn't exist");
          break;
        case "storage/unauthorized":
          console.error("User doesn't have permission to access the object");
          break;
        case "storage/canceled":
          console.error("User canceled the upload");
          break;
        case "storage/unknown":
          console.error("Unknown error occurred, inspect the server response");
          break;
      }
    });
};
