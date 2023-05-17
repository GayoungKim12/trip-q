import { get, ref } from "firebase/database";
import { database } from "./firebase";

const getDestinationList = async () => {
  try {
    const snapshot = await get(ref(database, "Destinations"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export default getDestinationList;
