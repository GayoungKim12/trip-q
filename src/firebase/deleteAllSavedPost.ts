import { db } from "./firebase";

const deleteAllSavedPost = async (postId: string) => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const batch = db.batch();

    usersSnapshot.forEach((userDoc) => {
      const saveCommentsRef = userDoc.ref.collection("saveComments");

      saveCommentsRef.doc(postId).delete();
    });

    await batch.commit();
  } catch (error) {
    console.error(error);
  }
};

export default deleteAllSavedPost;
